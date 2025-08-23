import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  Building2, 
  Tractor, 
  UserCheck, 
  Users, 
  Star,
  MapPin,
  Phone,
  MessageCircle
} from "lucide-react";

const serviceCategories = [
  {
    id: 1,
    title: "House Agents",
    description: "Professional residential property agents",
    icon: Home,
    count: 12,
    professionals: [
      {
        id: 1,
        name: "Sarah Mwangi",
        rating: 4.9,
        experience: "8 years",
        location: "Nairobi",
        specialties: ["Luxury Homes", "Apartments"],
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 2,
        name: "David Kiprotich",
        rating: 4.8,
        experience: "6 years",
        location: "Nairobi",
        specialties: ["Family Homes", "Townhouses"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      }
    ]
  },
  {
    id: 2,
    title: "Shop Agents",
    description: "Commercial property specialists",
    icon: Building2,
    count: 8,
    professionals: [
      {
        id: 3,
        name: "Grace Wanjiku",
        rating: 4.7,
        experience: "5 years",
        location: "Nairobi CBD",
        specialties: ["Retail Spaces", "Offices"],
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 4,
        name: "John Ochieng",
        rating: 4.6,
        experience: "7 years",
        location: "Westlands",
        specialties: ["Commercial Buildings", "Warehouses"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      }
    ]
  },
  {
    id: 3,
    title: "Shamba Agents",
    description: "Agricultural land and farm specialists",
    icon: Tractor,
    count: 6,
    professionals: [
      {
        id: 5,
        name: "Peter Kamau",
        rating: 4.9,
        experience: "10 years",
        location: "Kiambu",
        specialties: ["Agricultural Land", "Coffee Farms"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      }
    ]
  },
  {
    id: 4,
    title: "House Girls",
    description: "Reliable domestic workers for household management",
    icon: UserCheck,
    count: 15,
    professionals: [
      {
        id: 6,
        name: "Mary Nyong'o",
        rating: 4.8,
        experience: "4 years",
        location: "Karen",
        specialties: ["Cleaning", "Cooking", "Childcare"],
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 7,
        name: "Agnes Wanjiru",
        rating: 4.7,
        experience: "6 years", 
        location: "Westlands",
        specialties: ["Housekeeping", "Laundry", "Cooking"],
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
      }
    ]
  },
  {
    id: 5,
    title: "House Boys",
    description: "Trusted domestic workers for general household duties",
    icon: Users,
    count: 10,
    professionals: [
      {
        id: 8,
        name: "Samuel Mwangi",
        rating: 4.6,
        experience: "5 years",
        location: "Kilimani",
        specialties: ["Maintenance", "Security", "Gardening"],
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
      }
    ]
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with verified professionals for all your real estate and household needs
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-12">
          {serviceCategories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <section key={category.id} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {category.count} available
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.professionals.map((professional) => (
                    <Card key={professional.id} className="group cursor-pointer transition-spring hover:shadow-medium border border-border hover:border-primary/20">
                      <CardHeader className="pb-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={professional.avatar} alt={professional.name} />
                            <AvatarFallback>{professional.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <CardTitle className="text-lg text-foreground mb-1">
                              {professional.name}
                            </CardTitle>
                            
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-current text-accent" />
                                <span className="text-sm font-medium">{professional.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{professional.experience}</span>
                            </div>
                            
                            <div className="flex items-center text-muted-foreground text-sm">
                              <MapPin className="w-3 h-3 mr-1" />
                              {professional.location}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Specialties:</p>
                          <div className="flex flex-wrap gap-2">
                            {professional.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="default" size="sm" className="flex-1">
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* View All Card */}
                  <Card className="group cursor-pointer transition-spring hover:shadow-medium border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 flex items-center justify-center min-h-[280px]">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-smooth">
                        <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-smooth" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">View All {category.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        See all {category.count} professionals
                      </p>
                    </div>
                  </Card>
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need a Custom Service?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Let us know your specific requirements and we'll connect you with the right professional.
          </p>
          <Button variant="hero" size="lg">
            Request Custom Service
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Services;