import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Heart, Target, Users, User } from "lucide-react";
import ceoImage from "@/assets/ceo-portrait.jpg";

const About = () => {
  const managementTeam = [
    {
      name: "Engr. Ebenezer Kakrah Hammah",
      title: "Chief Executive Officer",
      description: "Visionary leader with over two decades of experience in electromechanical engineering and manufacturing excellence.",
      image: ceoImage
    },
    {
      name: "Leadership Team Member",
      title: "Chief Operations Officer",
      description: "Expert in operational excellence and manufacturing process optimization.",
      image: null
    },
    {
      name: "Leadership Team Member",
      title: "Technical Director",
      description: "Specialized in electromechanical systems and innovation development.",
      image: null
    },
    {
      name: "Leadership Team Member",
      title: "Business Development Director",
      description: "Driving strategic growth and industry partnerships across West Africa.",
      image: null
    }
  ];

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
            {/* Leadership Team Section */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Leadership Team</h3>
              <div className="grid grid-cols-2 gap-4">
                {managementTeam.map((member, index) => (
                  <Card key={index} className="card-professional">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={`${member.name} - ${member.title}`}
                            className="w-20 h-20 rounded-full object-cover mb-4"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <User className="h-10 w-10 text-primary" />
                          </div>
                        )}
                        <h4 className="font-semibold text-base mb-1">{member.name}</h4>
                        <p className="text-primary font-medium text-sm mb-2">{member.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

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