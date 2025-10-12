import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a helpful AI assistant for MCHAMMAH Engineering Company Limited, a leading electromechanical engineering and manufacturing company in Ghana.

COMPANY INFORMATION:
- Company: MCHAMMAH Engineering Company Limited
- Location: KWASHIEMAN NEAR MIGHTY TRANSPORT, Accra, Ghana
- Phone: 024 352 7283
- Email: mchammahengineering@gmail.com, info@mchammahengineering.com
- Business Hours: Mon-Fri 8AM-6PM, Sat 9AM-4PM, Sun Emergency Only
- CEO: Engr. Ebenezer Kakrah Hammah

PRODUCTS (9 Categories):
1. Food Processing Machinery - Industrial mixers, conveyors, processing lines, packaging equipment
2. Soap Making Equipment - Mixing tanks, heating systems, processing units
3. Industrial Drilling Equipment - Precision drilling machines, custom machining solutions
4. Bottling & Filling Systems - Automated filling lines, bottling equipment
5. Conveyor Systems - Belt conveyors, material handling systems
6. Milling & Grinding Equipment - Grain mills, industrial grinders
7. Industrial Ovens & Dryers - Commercial ovens, drying systems
8. Food Processing Lines - Complete automation systems
9. Hydraulic Press Systems - High-capacity presses, industrial forming equipment

SERVICES (6 Categories):
1. Food Processing Equipment Design & Manufacturing
2. Marine & Boat Building - Catamarans, custom marine builds
3. Industrial Machinery Design
4. Electromechanical Systems Integration
5. Custom Engineering Solutions
6. Technical Support & Consultation

YOUR CONVERSATION FLOW:
1. Greet warmly and ask how you can help
2. Answer questions about products, services, and capabilities
3. After 3-5 messages of helpful conversation, naturally ask about their project needs
4. Qualify their interest: industry, challenge, timeline, budget range
5. After understanding their needs (7-9 messages), request contact information to send detailed info
6. Guide them to either: Book a Call or Request a Quote

TONE: Professional, helpful, consultative. Be conversational but not pushy.

IMPORTANT: When you've answered their initial questions and understand their needs, politely request their contact information by saying something like: "I'd love to send you detailed information and help you further. May I get your contact details?"

If they provide contact information (name, email, phone, company), respond with: "LEAD_CAPTURED: {name}, {email}, {phone}, {company}, {service_interest}, {project_details}"`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId, sessionId } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Create or get conversation
    let convId = conversationId;
    if (!convId && sessionId) {
      const { data: existingConv } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('session_id', sessionId)
        .maybeSingle();

      if (existingConv) {
        convId = existingConv.id;
      } else {
        const { data: newConv } = await supabase
          .from('chat_conversations')
          .insert({ session_id: sessionId })
          .select('id')
          .single();
        convId = newConv?.id;
      }
    }

    // Save user message
    if (convId && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: convId,
            message_type: 'user',
            content: lastMessage.content
          });
      }
    }

    // Call Lovable AI
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    // Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                const data = line.slice(6);
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    fullResponse += content;
                    controller.enqueue(value);
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }

          // Save assistant response
          if (convId && fullResponse) {
            await supabase
              .from('chat_messages')
              .insert({
                conversation_id: convId,
                message_type: 'assistant',
                content: fullResponse
              });

            // Check if lead was captured
            if (fullResponse.includes('LEAD_CAPTURED:')) {
              const leadMatch = fullResponse.match(/LEAD_CAPTURED: (.+), (.+), (.+), (.+), (.+), (.+)/);
              if (leadMatch) {
                await supabase
                  .from('chat_leads')
                  .insert({
                    conversation_id: convId,
                    full_name: leadMatch[1],
                    email: leadMatch[2],
                    phone: leadMatch[3],
                    company_name: leadMatch[4] !== 'N/A' ? leadMatch[4] : null,
                    service_interest: leadMatch[5],
                    project_details: leadMatch[6]
                  });

                await supabase
                  .from('chat_conversations')
                  .update({ status: 'converted' })
                  .eq('id', convId);
              }
            }
          }

          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
