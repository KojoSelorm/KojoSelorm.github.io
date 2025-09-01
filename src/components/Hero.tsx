import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-manufacturing.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="MCHAMMAH Engineering Manufacturing Facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-1 w-12 bg-accent rounded-full"></div>
              <span className="text-accent font-semibold">Innovation • Quality • Excellence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Leading the Future of{" "}
              <span className="text-primary">Electromechanical</span>{" "}
              Engineering
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              MCHAMMAH Engineering Company Limited specializes in innovative food processing machinery, 
              industrial equipment manufacturing, and comprehensive electromechanical solutions.
            </p>

            {/* Key Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Award-Winning Innovation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Local Manufacturing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Proven Expertise</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero group">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="btn-secondary">
                Explore Products
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="animate-scale-in lg:justify-self-end">
            <div className="card-professional max-w-md">
              <h3 className="text-xl font-semibold mb-4">Why Choose MCHAMMAH?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Local Manufacturing Excellence</h4>
                    <p className="text-sm text-muted-foreground">Proudly manufacturing quality equipment locally</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Innovative Solutions</h4>
                    <p className="text-sm text-muted-foreground">Cutting-edge technology for modern industry needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Proven Track Record</h4>
                    <p className="text-sm text-muted-foreground">Award-winning achievements and satisfied customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;