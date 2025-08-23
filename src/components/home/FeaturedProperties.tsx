import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square, Heart, Eye } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Modern Family Villa",
    price: "KSh 45M",
    type: "sale",
    location: "Karen, Nairobi",
    bedrooms: 4,
    bathrooms: 3,
    area: "350 sqm",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Luxury Apartment",
    price: "KSh 80K/month",
    type: "rent",
    location: "Westlands, Nairobi",
    bedrooms: 2,
    bathrooms: 2,
    area: "120 sqm",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    featured: false
  },
  {
    id: 3,
    title: "Executive Townhouse",
    price: "KSh 25M",
    type: "sale",
    location: "Kilimani, Nairobi",
    bedrooms: 3,
    bathrooms: 2,
    area: "200 sqm",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 4,
    title: "Studio Apartment",
    price: "KSh 35K/month",
    type: "rent",
    location: "Upperhill, Nairobi",
    bedrooms: 1,
    bathrooms: 1,
    area: "60 sqm",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    featured: false
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties available for rent and sale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="group cursor-pointer transition-spring hover:shadow-large overflow-hidden">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
                />
                
                {/* Overlay Actions */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <Button variant="ghost" size="icon" className="bg-background/80 hover:bg-background">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-background/80 hover:bg-background">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  {property.featured && (
                    <Badge variant="secondary" className="bg-property-featured text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                  <Badge 
                    variant="outline" 
                    className={`${
                      property.type === "rent" 
                        ? "bg-property-rent text-accent-foreground border-property-rent" 
                        : "bg-property-sale text-secondary-foreground border-property-sale"
                    }`}
                  >
                    For {property.type === "rent" ? "Rent" : "Sale"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.area}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    {property.price}
                  </div>
                  <Button 
                    variant={property.type === "rent" ? "rent" : "sale"} 
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;