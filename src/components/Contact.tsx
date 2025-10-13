import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Validation schema for quote requests
const quoteRequestSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email too long'),
  phone: z.string()
    .trim()
    .regex(/^\+?[0-9\s-]{10,20}$/, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),
  company: z.string()
    .trim()
    .max(200, 'Company name too long')
    .optional()
    .or(z.literal('')),
  service_interest: z.string()
    .min(1, 'Please select a service'),
  project_details: z.string()
    .trim()
    .min(20, 'Please provide at least 20 characters')
    .max(2000, 'Message too long (max 2000 characters)')
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    project_details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Facility",
      details: ["KWASHIEMAN NEAR MIGHTY TRANSPORT", "Accra, Ghana"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["024 352 7283"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["mchammahengineering@gmail.com", "info@mchammahengineering.com"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM", "Sunday: Emergency Only"]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = quoteRequestSchema.parse(formData);

      // Submit to Supabase
      const { error } = await supabase
        .from('quote_requests')
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          company: validatedData.company || null,
          service_interest: validatedData.service_interest,
          project_details: validatedData.project_details
        }]);

      if (error) throw error;

      toast.success('Quote request sent successfully! We\'ll contact you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interest: '',
        project_details: ''
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error('Failed to send quote request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-1 w-12 bg-accent rounded-full"></div>
            <span className="text-accent font-semibold">Get In Touch</span>
            <div className="h-1 w-12 bg-accent rounded-full"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Discuss Your{" "}
            <span className="text-primary">Next Project</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your operations with innovative engineering solutions? 
            Contact us today for a consultation or quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-professional">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg">{info.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="text-2xl">Request a Quote</CardTitle>
                <p className="text-muted-foreground">
                  Tell us about your project requirements and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input 
                        placeholder="Enter your full name" 
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <Input 
                        placeholder="Your company name" 
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address *</label>
                      <Input 
                        type="email" 
                        placeholder="your.email@company.com" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input 
                        placeholder="+233 XX XXX XXXX" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium">Service Interest *</label>
                    <select 
                      className="w-full p-3 border border-input rounded-md bg-background"
                      value={formData.service_interest}
                      onChange={(e) => handleInputChange('service_interest', e.target.value)}
                      required
                    >
                      <option value="">Select service type</option>
                      <option>Food Processing Equipment</option>
                      <option>Marine Manufacturing</option>
                      <option>Industrial Machinery</option>
                      <option>Electromechanical Systems</option>
                      <option>Consultation Services</option>
                      <option>Custom Solutions</option>
                    </select>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium">Project Details *</label>
                    <Textarea 
                      placeholder="Please describe your project requirements, timeline, and any specific needs..."
                      rows={5}
                      value={formData.project_details}
                      onChange={(e) => handleInputChange('project_details', e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="btn-hero flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Quote Request'}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="lg" 
                      className="btn-secondary"
                      onClick={() => window.location.href = 'tel:+233243527283'}
                    >
                      Schedule Call
                    </Button>
                  </div>
                </form>

                <p className="text-sm text-muted-foreground">
                  * Required fields. We respect your privacy and will never share your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;