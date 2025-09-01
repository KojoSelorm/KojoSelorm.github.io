import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cog, Factory, Wrench, Truck } from "lucide-react";
import foodProcessingImage from "@/assets/food-processing-equipment.jpg";
import catamaranImage from "@/assets/catamaran-boat.jpg";
import electromechanicalImage from "@/assets/electromechanical-systems.jpg";
import industrialEquipmentImage from "@/assets/industrial-equipment.jpg";

const Products = () => {
  const productCategories = [
    {
      icon: Factory,
      title: "Food Processing Machinery",
      description: "Industrial-grade equipment for food production, processing, and packaging solutions",
      image: foodProcessingImage,
      features: ["Industrial Mixers", "Conveyor Systems", "Processing Lines", "Packaging Equipment"]
    },
    {
      icon: Truck,
      title: "Marine Manufacturing",
      description: "Custom boat building and marine equipment manufacturing with precision craftsmanship",
      image: catamaranImage,
      features: ["Catamaran Boats", "Marine Components", "Custom Designs", "Quality Craftsmanship"]
    },
    {
      icon: Cog,
      title: "Electromechanical Systems",
      description: "Comprehensive electrical and mechanical engineering solutions for industrial applications",
      image: electromechanicalImage,
      features: ["System Design", "Installation", "Maintenance", "Consultancy"]
    },
    {
      icon: Wrench,
      title: "Industrial Equipment",
      description: "Specialized machinery and equipment for various industrial and agricultural applications",
      image: industrialEquipmentImage,
      features: ["Soap Making Equipment", "Agricultural Machinery", "Custom Solutions", "After-sales Support"]
    }
  ];

  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-1 w-12 bg-accent rounded-full"></div>
            <span className="text-accent font-semibold">Our Products & Services</span>
            <div className="h-1 w-12 bg-accent rounded-full"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Innovative Solutions for{" "}
            <span className="text-primary">Modern Industry</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From food processing machinery to marine manufacturing, we deliver cutting-edge 
            solutions that drive efficiency and innovation across industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {productCategories.map((product, index) => (
            <Card key={index} className="card-product group">
              {product.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              )}
              
              <CardHeader className={product.image ? "relative -mt-8 z-10" : ""}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <product.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="btn-accent">
            View Complete Product Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;