import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  Building2, 
  Tractor, 
  UserCheck, 
  Users, 
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  Clock
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
    color: "primary",
    professionals: [
      {
        id: 1,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
        experience: "8 years",
        specialization: "Luxury Homes",
        location: "Nairobi, Kenya",
        phone: "+254 712 345 678",
        email: "sarah.johnson@propertyhub.com",
        completedDeals: 156,
        languages: ["English", "Swahili"],
        certifications: ["Licensed Real Estate Agent", "Property Management"]
      },
      {
        id: 2,
        name: "Michael Ochieng",
        avatar: "/placeholder.svg",
        experience: "5 years",
        specialization: "Affordable Housing",
        location: "Kisumu, Kenya",
        phone: "+254 723 456 789",
        email: "michael.ochieng@propertyhub.com",
        completedDeals: 89,
        languages: ["English", "Swahili", "Luo"],
        certifications: ["Licensed Real Estate Agent"]
      }
    ]
  },
  {
    id: 2,
    title: "Shop Agent",
    description: "Commercial property specialists for retail and business spaces",
    icon: Building2,
    category: "Agent Services", 
    rating: 4.7,
    available: 8,
    color: "secondary",
    professionals: [
      {
        id: 3,
        name: "David Kimani",
        avatar: "/placeholder.svg",
        experience: "10 years",
        specialization: "Commercial Retail",
        location: "Mombasa, Kenya",
        phone: "+254 734 567 890",
        email: "david.kimani@propertyhub.com",
        completedDeals: 203,
        languages: ["English", "Swahili"],
        certifications: ["Commercial Real Estate License", "Business Development"]
      }
    ]
  },
  {
    id: 3,
    title: "Shamba Agent",
    description: "Agricultural land and farm property experts for rural investments",
    icon: Tractor,
    category: "Agent Services",
    rating: 4.9,
    available: 6,
    color: "accent",
    professionals: [
      {
        id: 4,
        name: "Grace Wanjiku",
        avatar: "/placeholder.svg",
        experience: "12 years",
        specialization: "Agricultural Land",
        location: "Nakuru, Kenya",
        phone: "+254 745 678 901",
        email: "grace.wanjiku@propertyhub.com",
        completedDeals: 127,
        languages: ["English", "Swahili", "Kikuyu"],
        certifications: ["Agricultural Land Specialist", "Rural Development"]
      }
    ]
  },
  {
    id: 4,
    title: "House Girl",
    description: "Reliable domestic workers for household management and cleaning services",
    icon: UserCheck,
    category: "Domestic Services",
    rating: 4.6,
    available: 15,
    color: "primary",
    professionals: [
      {
        id: 5,
        name: "Mary Akinyi",
        avatar: "/placeholder.svg",
        experience: "6 years",
        specialization: "Housekeeping & Childcare",
        location: "Nairobi, Kenya",
        phone: "+254 756 789 012",
        email: "mary.akinyi@propertyhub.com",
        completedDeals: 45,
        languages: ["English", "Swahili", "Luo"],
        certifications: ["Professional Housekeeping", "First Aid"]
      }
    ]
  },
  {
    id: 5,
    title: "House Boy",
    description: "Trusted domestic workers for general household duties and maintenance",
    icon: Users,
    category: "Domestic Services",
    rating: 4.5,
    available: 10,
    color: "secondary",
    professionals: [
      {
        id: 6,
        name: "John Mwangi",
        avatar: "/placeholder.svg",
        experience: "4 years",
        specialization: "General Maintenance",
        location: "Nairobi, Kenya",
        phone: "+254 767 890 123",
        email: "john.mwangi@propertyhub.com",
        completedDeals: 32,
        languages: ["English", "Swahili", "Kikuyu"],
        certifications: ["Basic Maintenance", "Security Training"]
      }
    ]
  },
  {
    id: 6,
    title: "Rental Agent",
    description: "Specialized agents for rental properties and tenant management",
    icon: Home,
    category: "Agent Services",
    rating: 4.8,
    available: 9,
    color: "accent",
    professionals: [
      {
        id: 7,
        name: "Catherine Njeri",
        avatar: "/placeholder.svg",
        experience: "7 years",
        specialization: "Rental Management",
        location: "Nairobi, Kenya",
        phone: "+254 778 901 234",
        email: "catherine.njeri@propertyhub.com",
        completedDeals: 178,
        languages: ["English", "Swahili", "Kikuyu"],
        certifications: ["Property Management License", "Tenant Relations"]
      }
    ]
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
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
              <Dialog key={service.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer transition-spring hover:shadow-medium border border-border hover:border-primary/20">
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
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.category}</p>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="mt-6">
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    
                    <div className="grid gap-6">
                      <h4 className="text-lg font-semibold">Available Professionals</h4>
                      
                      {service.professionals.map((professional) => (
                        <Card key={professional.id} className="p-6">
                          <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex flex-col items-center lg:items-start">
                              <Avatar className="w-24 h-24 mb-4">
                                <AvatarImage src={professional.avatar} alt={professional.name} />
                                <AvatarFallback className="text-lg">
                                  {professional.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-center lg:text-left">
                                <h5 className="font-semibold text-lg">{professional.name}</h5>
                                <p className="text-sm text-muted-foreground">{professional.specialization}</p>
                              </div>
                            </div>
                            
                            <div className="flex-1 grid md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{professional.experience} experience</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{professional.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Award className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{professional.completedDeals} completed deals</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Star className="w-4 h-4 fill-current text-accent" />
                                  <span className="text-sm">Languages: {professional.languages.join(', ')}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{professional.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{professional.email}</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">Certifications:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {professional.certifications.map((cert, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {cert}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-6">
                            <Button className="flex-1">
                              <Phone className="w-4 h-4 mr-2" />
                              Call Now
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <Mail className="w-4 h-4 mr-2" />
                              Send Message
                            </Button>
                            <Button variant="outline">
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule Meeting
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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