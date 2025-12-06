import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest: string;
  project_details: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: QuoteNotificationRequest = await req.json();
    console.log("Received quote notification request:", data);

    // Send notification to business
    const adminEmailResponse = await resend.emails.send({
      from: "MCHAMMAH Engineering <onboarding@resend.dev>",
      to: ["mchammahengineering@gmail.com"],
      subject: `New Quote Request from ${data.name} - ${data.service_interest}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Quote Request</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Customer Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${data.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Company:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${data.company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Service Interest:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong style="color: #3b82f6;">${data.service_interest}</strong></td>
              </tr>
            </table>
            
            <h3 style="color: #1e3a8a; margin-top: 25px;">Project Details</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; white-space: pre-wrap;">${data.project_details}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #dbeafe; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #1e3a8a;"><strong>⏰ Please respond within 24 hours</strong></p>
            </div>
          </div>
          
          <div style="padding: 20px; background: #1e3a8a; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">MCHAMMAH Engineering Ltd - Quote Management System</p>
          </div>
        </div>
      `,
    });

    console.log("Admin email sent successfully:", adminEmailResponse);

    // Send confirmation to customer
    const customerEmailResponse = await resend.emails.send({
      from: "MCHAMMAH Engineering <onboarding@resend.dev>",
      to: [data.email],
      subject: "We received your quote request - MCHAMMAH Engineering",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Thank You, ${data.name}!</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <p style="font-size: 16px; color: #334155;">We have received your quote request for <strong>${data.service_interest}</strong> and our team is already reviewing your requirements.</p>
            
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">What Happens Next?</h3>
              <ul style="color: #334155; margin-bottom: 0;">
                <li>Our engineering team will review your project details</li>
                <li>We will prepare a customized quote for your needs</li>
                <li>You will receive a response within <strong>24 hours</strong></li>
              </ul>
            </div>
            
            <h3 style="color: #1e3a8a;">Your Request Summary</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p><strong>Service:</strong> ${data.service_interest}</p>
              <p style="margin-bottom: 0;"><strong>Project Details:</strong><br/>${data.project_details}</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <p style="color: #64748b;">Need immediate assistance?</p>
              <p style="margin: 5px 0;"><strong>📞 Call us:</strong> <a href="tel:+233243527283" style="color: #3b82f6;">024 352 7283</a></p>
              <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:mchammahengineering@gmail.com" style="color: #3b82f6;">mchammahengineering@gmail.com</a></p>
            </div>
          </div>
          
          <div style="padding: 20px; background: #1e3a8a; text-align: center;">
            <p style="color: white; margin: 0; font-size: 14px;">MCHAMMAH Engineering Ltd</p>
            <p style="color: #93c5fd; margin: 5px 0 0; font-size: 12px;">Precision Engineering Excellence Since Establishment</p>
          </div>
        </div>
      `,
    });

    console.log("Customer confirmation email sent successfully:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        customerEmail: customerEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-quote-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
