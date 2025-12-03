import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cog, Factory, Wrench, Truck } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import product9 from "@/assets/product-9.jpg";

const Products = () => {
  const productCategories = [
    {
      icon: Factory,
      title: "Food Processing Machinery",
      description: "Industrial-grade equipment for food production, processing, and packaging solutions",
      image: product1,
      features: ["Industrial Mixers", "Conveyor Systems", "Processing Lines", "Packaging Equipment"]
    },
    {
      icon: Factory,
      title: "Soap Making Equipment",
      description: "Custom soap processing and manufacturing equipment for industrial production",
      image: product2,
      features: ["Mixing Tanks", "Heating Systems", "Processing Units", "Custom Solutions"]
    },
    {
      icon: Wrench,
      title: "Industrial Drilling Equipment",
      description: "High-precision drilling and machining equipment for industrial applications",
      image: product3,
      features: ["Precision Drilling", "Custom Machining", "Industrial Tools", "Equipment Maintenance"]
    },
    {
      icon: Factory,
      title: "Bottling & Filling Systems",
      description: "Automated bottling and filling equipment for liquid product manufacturing",
      image: product4,
      features: ["Automated Filling", "Bottling Lines", "Quality Control", "Packaging Solutions"]
    },
    {
      icon: Cog,
      title: "Conveyor Systems",
      description: "Industrial conveyor and material handling systems for production lines",
      image: product5,
      features: ["Belt Conveyors", "Material Handling", "Custom Design", "System Integration"]
    },
    {
      icon: Factory,
      title: "Milling & Grinding Equipment",
      description: "Heavy-duty milling and grinding machinery for agricultural and industrial use",
      image: product6,
      features: ["Grain Mills", "Industrial Grinders", "Processing Systems", "Custom Solutions"]
    },
    {
      icon: Factory,
      title: "Industrial Ovens & Dryers",
      description: "Commercial-grade ovens and drying equipment for food and industrial processing",
      image: product7,
      features: ["Industrial Ovens", "Drying Systems", "Temperature Control", "Energy Efficient"]
    },
    {
      icon: Factory,
      title: "Food Processing Lines",
      description: "Complete food processing systems with advanced control and automation",
      image: product8,
      features: ["Processing Lines", "Automation Systems", "Quality Assurance", "Turnkey Solutions"]
    },
    {
      icon: Wrench,
      title: "Hydraulic Press Systems",
      description: "High-capacity hydraulic press equipment for industrial manufacturing",
      image: product9,
      features: ["Hydraulic Presses", "Industrial Forming", "Custom Tooling", "Safety Systems"]
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {productCategories.map((product, index) => (
            <Card key={index} className="card-product group">
              {product.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              
              <CardHeader className="pt-5">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <product.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg leading-tight">{product.title}</CardTitle>
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