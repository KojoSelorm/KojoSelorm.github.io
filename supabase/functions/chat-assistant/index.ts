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

YOUR PRIMARY GOAL:
Encourage EVERY user to submit their contact details so our engineers can provide a FREE custom quote or technical diagnosis for their specific needs. This is extremely valuable to potential customers!

YOUR CONVERSATION FLOW:
1. Greet warmly and ask how you can help
2. Answer their initial question helpfully
3. After 2-3 exchanges, actively encourage them to get a FREE personalized quote or custom diagnosis
4. Highlight the VALUE they get: "Our engineers can analyze your specific requirements and provide a detailed custom quote at no cost"
5. Ask for their details: name, email, phone, company (optional), what service they're interested in, and project details
6. If they hesitate, remind them: "There's no obligation - just a free expert consultation to help you make an informed decision"

LEAD CAPTURE INCENTIVES (Use these naturally):
- "Would you like a FREE custom quote tailored to your exact specifications?"
- "Our engineers can provide a FREE technical diagnosis of your requirements"
- "I can connect you with our team for a personalized consultation at no cost"
- "Let me get your details so we can send you a detailed proposal with pricing"
- "We offer FREE site assessments for qualified projects"

TONE: Professional, helpful, consultative. Be proactive about offering the free quote/diagnosis - it's a genuine value-add for the customer, not pushy sales.

CRITICAL INSTRUCTIONS:
1. ALWAYS work towards collecting contact information within the conversation
2. Make the free quote/diagnosis sound valuable and beneficial (because it is!)
3. When asking for details, be clear about what you need: Full name, Email, Phone number, Company name (optional), Service interest, and Brief project description
4. Once you have ALL the required information (name, email, phone, service interest, project details), immediately output the lead data

OUTPUT FORMAT FOR LEAD CAPTURE:
When the user provides their contact information, you MUST respond with this EXACT format at the END of your helpful response:
LEAD_CAPTURED: {full_name}, {email}, {phone}, {company_or_N/A}, {service_interest}, {project_details}

Example: "Thank you for sharing your details! Our engineering team will review your requirements and get back to you within 24 hours with a customized quote.

LEAD_CAPTURED: John Mensah, john@example.com, 0244123456, Mensah Foods Ltd, Food Processing Equipment, Need industrial mixer for shea butter processing, capacity 500kg/hour"`;

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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
        const encoder = new TextEncoder();
        let fullResponse = '';
        let buffer = '';

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            // Process complete lines only
            let newlineIndex;
            while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
              const line = buffer.slice(0, newlineIndex);
              buffer = buffer.slice(newlineIndex + 1);

              if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
                const data = line.slice(6);
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    fullResponse += content;
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }

              // Forward each line individually
              controller.enqueue(encoder.encode(line + '\n'));
            }
          }

          // Process any remaining buffer
          if (buffer.trim()) {
            if (buffer.startsWith('data: ') && buffer.trim() !== 'data: [DONE]') {
              try {
                const parsed = JSON.parse(buffer.slice(6));
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  fullResponse += content;
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
            controller.enqueue(encoder.encode(buffer + '\n'));
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
                const { data, error: leadError } = await supabase
                  .from('chat_leads')
                  .insert({
                    conversation_id: convId,
                    full_name: leadMatch[1].trim(),
                    email: leadMatch[2].trim(),
                    phone: leadMatch[3].trim(),
                    company_name: leadMatch[4] !== 'N/A' ? leadMatch[4].trim() : null,
                    service_interest: leadMatch[5].trim(),
                    project_details: leadMatch[6].trim(),
                    intent: 'quote'
                  });

                if (leadError) {
                  console.error('Failed to save lead:', leadError);
                } else {
                  console.log('Lead captured successfully:', data);
                  
                  // Send email notification for the new lead
                  if (RESEND_API_KEY) {
                    try {
                      const leadData = {
                        full_name: leadMatch[1].trim(),
                        email: leadMatch[2].trim(),
                        phone: leadMatch[3].trim(),
                        company_name: leadMatch[4] !== 'N/A' ? leadMatch[4].trim() : null,
                        service_interest: leadMatch[5].trim(),
                        project_details: leadMatch[6].trim(),
                      };

                      // Import Resend dynamically
                      const { Resend } = await import("npm:resend@2.0.0");
                      const resend = new Resend(RESEND_API_KEY);

                      // Send notification to business
                      await resend.emails.send({
                        from: "MCHAMMAH Engineering <onboarding@resend.dev>",
                        to: ["mchammahengineering@gmail.com"],
                        subject: `🤖 New Chatbot Lead: ${leadData.full_name} - ${leadData.service_interest}`,
                        html: `
                          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; text-align: center;">
                              <h1 style="color: white; margin: 0;">🤖 New Chatbot Lead</h1>
                              <p style="color: #93c5fd; margin: 10px 0 0;">Captured via AI Assistant</p>
                            </div>
                            
                            <div style="padding: 30px; background: #f8fafc;">
                              <h2 style="color: #1e3a8a; margin-top: 0;">Lead Details</h2>
                              
                              <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Name:</strong></td>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${leadData.full_name}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${leadData.email}">${leadData.email}</a></td>
                                </tr>
                                <tr>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="tel:${leadData.phone}">${leadData.phone}</a></td>
                                </tr>
                                <tr>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Company:</strong></td>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${leadData.company_name || 'Not provided'}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Service Interest:</strong></td>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong style="color: #3b82f6;">${leadData.service_interest}</strong></td>
                                </tr>
                              </table>
                              
                              <h3 style="color: #1e3a8a; margin-top: 25px;">Project Details</h3>
                              <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                                <p style="margin: 0; white-space: pre-wrap;">${leadData.project_details}</p>
                              </div>
                              
                              <div style="margin-top: 30px; padding: 20px; background: #dcfce7; border-radius: 8px; text-align: center;">
                                <p style="margin: 0; color: #166534;"><strong>✅ This lead was captured automatically by the AI chatbot</strong></p>
                                <p style="margin: 10px 0 0; color: #166534;">Please follow up within 24 hours</p>
                              </div>
                            </div>
                            
                            <div style="padding: 20px; background: #1e3a8a; text-align: center;">
                              <p style="color: white; margin: 0; font-size: 12px;">MCHAMMAH Engineering Ltd - AI Lead Capture System</p>
                            </div>
                          </div>
                        `,
                      });

                      // Send confirmation to the lead
                      await resend.emails.send({
                        from: "MCHAMMAH Engineering <onboarding@resend.dev>",
                        to: [leadData.email],
                        subject: "Thank you for your interest! - MCHAMMAH Engineering",
                        html: `
                          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; text-align: center;">
                              <h1 style="color: white; margin: 0;">Thank You, ${leadData.full_name}!</h1>
                            </div>
                            
                            <div style="padding: 30px; background: #f8fafc;">
                              <p style="font-size: 16px; color: #334155;">We've received your inquiry about <strong>${leadData.service_interest}</strong> and our engineering team is excited to help!</p>
                              
                              <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <h3 style="color: #1e3a8a; margin-top: 0;">What Happens Next?</h3>
                                <ul style="color: #334155; margin-bottom: 0;">
                                  <li>Our engineers will review your requirements</li>
                                  <li>We'll prepare a FREE custom quote or diagnosis</li>
                                  <li>You'll receive a response within <strong>24 hours</strong></li>
                                </ul>
                              </div>
                              
                              <h3 style="color: #1e3a8a;">Your Request Summary</h3>
                              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                                <p><strong>Service:</strong> ${leadData.service_interest}</p>
                                <p style="margin-bottom: 0;"><strong>Details:</strong><br/>${leadData.project_details}</p>
                              </div>
                              
                              <div style="margin-top: 30px; text-align: center;">
                                <p style="color: #64748b;">Need immediate assistance?</p>
                                <p style="margin: 5px 0;"><strong>📞 Call us:</strong> <a href="tel:+233243527283" style="color: #3b82f6;">024 352 7283</a></p>
                                <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:mchammahengineering@gmail.com" style="color: #3b82f6;">mchammahengineering@gmail.com</a></p>
                              </div>
                            </div>
                            
                            <div style="padding: 20px; background: #1e3a8a; text-align: center;">
                              <p style="color: white; margin: 0; font-size: 14px;">MCHAMMAH Engineering Ltd</p>
                              <p style="color: #93c5fd; margin: 5px 0 0; font-size: 12px;">Precision Engineering Excellence</p>
                            </div>
                          </div>
                        `,
                      });

                      console.log('Lead notification emails sent successfully');
                    } catch (emailError) {
                      console.error('Failed to send lead notification email:', emailError);
                    }
                  }
                }

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
