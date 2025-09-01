import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Heart, Target, Users } from "lucide-react";
import ceoImage from "@/assets/ceo-portrait.jpg";

const About = () => {
  const achievements = [
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Multiple awards for innovation and manufacturing excellence"
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Committed to social responsibility and community development"
    },
    {
      icon: Target,
      title: "Quality Focus",
      description: "Certified processes ensuring the highest quality standards"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Skilled engineers and technicians with decades of experience"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-1 w-12 bg-accent rounded-full"></div>
              <span className="text-accent font-semibold">About MCHAMMAH Engineering</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building the Future with{" "}
              <span className="text-primary">Local Excellence</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              MCHAMMAH Engineering Company Limited stands at the forefront of electromechanical 
              engineering and manufacturing in Ghana. Founded on principles of innovation, quality, 
              and community impact, we specialize in creating cutting-edge solutions for food 
              processing, industrial applications, and marine manufacturing.
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To deliver innovative, high-quality electromechanical solutions that drive 
                  industrial growth while contributing to local economic development and 
                  community empowerment.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the leading manufacturing and engineering company in West Africa, 
                  known for innovation, reliability, and positive community impact.
                </p>
              </div>
            </div>

            <Button size="lg" className="btn-hero">
              Learn More About Us
            </Button>
          </div>

          {/* Leadership & Achievements */}
          <div className="space-y-8">
            {/* CEO Section */}
            <Card className="card-professional">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <img
                    src={ceoImage}
                    alt="Engr. Ebenezer Kakrah Hammah - CEO"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">Engr. Ebenezer Kakrah Hammah</CardTitle>
                    <p className="text-primary font-medium">Chief Executive Officer</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Visionary leader with over two decades of experience in electromechanical 
                      engineering and manufacturing excellence.
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="card-professional text-center">
                  <CardContent className="pt-6">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                      <achievement.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;