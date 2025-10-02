import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input placeholder="Your company name" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address *</label>
                    <Input type="email" placeholder="your.email@company.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="+233 XX XXX XXXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Interest</label>
                  <select className="w-full p-3 border border-input rounded-md bg-background">
                    <option>Select service type</option>
                    <option>Food Processing Equipment</option>
                    <option>Marine Manufacturing</option>
                    <option>Industrial Machinery</option>
                    <option>Electromechanical Systems</option>
                    <option>Consultation Services</option>
                    <option>Custom Solutions</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Details *</label>
                  <Textarea 
                    placeholder="Please describe your project requirements, timeline, and any specific needs..."
                    rows={5}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="btn-hero flex-1">
                    Send Quote Request
                  </Button>
                  <Button variant="outline" size="lg" className="btn-secondary">
                    Schedule Call
                  </Button>
                </div>

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