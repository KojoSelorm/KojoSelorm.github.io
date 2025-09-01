import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Food Processing Equipment",
    "Marine Manufacturing",
    "Industrial Machinery",
    "Electromechanical Systems",
    "Custom Solutions",
    "Consultation Services"
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">MCHAMMAH</h3>
              <p className="text-sm opacity-80">Engineering Company Limited</p>
            </div>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              Leading electromechanical engineering and manufacturing company 
              specializing in innovative solutions for food processing, industrial 
              equipment, and marine applications.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-secondary-foreground/10"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <div className="space-y-3">
              {services.map((service, index) => (
                <p key={index} className="text-sm opacity-80">
                  {service}
                </p>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 opacity-60" />
                <div className="text-sm">
                  <p className="opacity-80">Industrial Area, Accra</p>
                  <p className="opacity-80">Ghana</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 opacity-60" />
                <p className="text-sm opacity-80">+233 XX XXX XXXX</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 opacity-60" />
                <p className="text-sm opacity-80">info@mchammah.com</p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Stay Updated</h5>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button size="sm" className="btn-accent">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-secondary-foreground/20" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm opacity-80">
            <p>&copy; 2024 MCHAMMAH Engineering Company Limited. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
              Terms of Service
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;