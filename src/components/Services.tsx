import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, Ship, Factory, Zap, Wrench, Headphones, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Factory,
      title: "Food Processing Equipment",
      description: "Custom-designed machinery for food processing operations, including conveyors, mixers, and packaging systems.",
      features: ["Custom Design", "High Efficiency", "Food-Safe Materials"]
    },
    {
      icon: Ship,
      title: "Marine & Boat Building",
      description: "Professional boat building and marine equipment manufacturing, including custom catamaran design and fabrication.",
      features: ["Custom Builds", "Quality Materials", "Expert Craftsmanship"]
    },
    {
      icon: Settings,
      title: "Industrial Machinery",
      description: "Design and manufacture of specialized industrial equipment tailored to your specific operational needs.",
      features: ["Precision Engineering", "Durable Construction", "Performance Optimized"]
    },
    {
      icon: Zap,
      title: "Electromechanical Systems",
      description: "Integrated electromechanical solutions combining mechanical and electrical engineering expertise.",
      features: ["Automation Ready", "Energy Efficient", "Smart Controls"]
    },
    {
      icon: Wrench,
      title: "Custom Engineering",
      description: "Tailored engineering solutions for unique challenges across various industries and applications.",
      features: ["Innovative Solutions", "Rapid Prototyping", "Cost Effective"]
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Comprehensive consultation and technical support services for all your engineering needs.",
      features: ["Expert Guidance", "Ongoing Support", "Training Available"]
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const navbarHeight = 64;
      const targetPosition = contactSection.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-accent rounded-full"></div>
            <span className="text-accent font-semibold">Our Services</span>
            <div className="h-1 w-12 bg-accent rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Engineering <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to completion, we provide end-to-end engineering services tailored to your industry needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="card-professional hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 bg-accent rounded-full"></div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-up">
          <div className="card-professional max-w-4xl mx-auto p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team of experienced engineers is ready to bring your vision to life with innovative solutions and exceptional quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero group" onClick={scrollToContact}>
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToContact}>
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;