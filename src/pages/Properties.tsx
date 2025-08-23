import { useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Eye, 
  SlidersHorizontal 
} from "lucide-react";

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
  {
    id: 5,
    title: "Commercial Office",
    price: "KSh 120K/month",
    type: "rent",
    location: "CBD, Nairobi",
    bedrooms: 0,
    bathrooms: 2,
    area: "180 sqm",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "Garden Maisonette",
    price: "KSh 32M",
    type: "sale",
    location: "Lavington, Nairobi",
    bedrooms: 3,
    bathrooms: 3,
    area: "280 sqm",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    featured: true
  },
];

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || property.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Property Listings
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our complete collection of properties for rent and sale
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card gradient-card rounded-2xl p-6 shadow-medium border border-border mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by property name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Quick filters:</span>
            <Button 
              variant={filterType === "rent" ? "rent" : "outline"} 
              size="sm"
              onClick={() => setFilterType("rent")}
            >
              For Rent
            </Button>
            <Button 
              variant={filterType === "sale" ? "sale" : "outline"} 
              size="sm"
              onClick={() => setFilterType("sale")}
            >
              For Sale
            </Button>
            <Button variant="outline" size="sm">Under KSh 20M</Button>
            <Button variant="outline" size="sm">3+ Bedrooms</Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="featured">Featured First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
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
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.bedrooms}
                      </div>
                    )}
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

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Properties
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Properties;