import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mensah",
      position: "Operations Manager",
      company: "Golden Foods Ltd.",
      content: "MCHAMMAH's food processing equipment has revolutionized our production line. The quality and efficiency gains have exceeded our expectations.",
      rating: 5
    },
    {
      name: "Dr. Kwame Asante",
      position: "Plant Director",
      company: "West African Manufacturing",
      content: "Outstanding engineering solutions and exceptional customer service. Their team's expertise in electromechanical systems is truly impressive.",
      rating: 5
    },
    {
      name: "Agnes Osei",
      position: "Factory Owner",
      company: "Osei Industries",
      content: "The custom machinery MCHAMMAH designed for our soap production has increased our efficiency by 200%. Highly recommended for industrial solutions.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-1 w-12 bg-accent rounded-full"></div>
            <span className="text-accent font-semibold">Customer Success Stories</span>
            <div className="h-1 w-12 bg-accent rounded-full"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from industry leaders who trust MCHAMMAH Engineering for their 
            most critical manufacturing and engineering needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-professional relative">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-primary">{testimonial.position}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;