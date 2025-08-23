import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Building2, 
  Tractor, 
  UserCheck, 
  Users, 
  Star,
  ArrowRight
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "House Agent",
    description: "Professional residential property agents to help you buy, sell, or rent homes",
    icon: Home,
    category: "Agent Services",
    rating: 4.8,
    available: 12,
    color: "primary"
  },
  {
    id: 2,
    title: "Shop Agent",
    description: "Commercial property specialists for retail and business spaces",
    icon: Building2,
    category: "Agent Services", 
    rating: 4.7,
    available: 8,
    color: "secondary"
  },
  {
    id: 3,
    title: "Shamba Agent",
    description: "Agricultural land and farm property experts for rural investments",
    icon: Tractor,
    category: "Agent Services",
    rating: 4.9,
    available: 6,
    color: "accent"
  },
  {
    id: 4,
    title: "House Girl",
    description: "Reliable domestic workers for household management and cleaning services",
    icon: UserCheck,
    category: "Domestic Services",
    rating: 4.6,
    available: 15,
    color: "primary"
  },
  {
    id: 5,
    title: "House Boy",
    description: "Trusted domestic workers for general household duties and maintenance",
    icon: Users,
    category: "Domestic Services",
    rating: 4.5,
    available: 10,
    color: "secondary"
  },
  {
    id: 6,
    title: "Rental Agent",
    description: "Specialized agents for rental properties and tenant management",
    icon: Home,
    category: "Agent Services",
    rating: 4.8,
    available: 9,
    color: "accent"
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified agents and domestic workers to meet all your real estate and household needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <Card key={service.id} className="group cursor-pointer transition-spring hover:shadow-medium border border-border hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-smooth">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-accent" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {service.available} available
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                  >
                    View Professionals
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;