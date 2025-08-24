import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Phone,
  Mail,
  Share2,
  Heart,
  ImageIcon,
  Star,
  CheckCircle
} from "lucide-react";

interface PropertyDetailsProps {
  property: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    location: string;
    property_type: string;
    bedrooms: number | null;
    bathrooms: number | null;
    area_sqft: number | null;
    features: string[] | null;
    images: string[] | null;
    status: string | null;
    created_at: string;
  };
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `KSh ${(price / 1000000).toFixed(1)}M`;
    }
    return `KSh ${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const images = property.images && property.images.length > 0 
    ? property.images 
    : [`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop`];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {property.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={images[selectedImage]}
                alt={property.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                onClick={() => setIsImageModalOpen(true)}
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? "border-primary" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </div>
                  <Badge 
                    variant="outline" 
                    className="bg-property-sale text-secondary-foreground border-property-sale"
                  >
                    For Sale
                  </Badge>
                </div>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{property.location}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}
                    </div>
                  )}
                  {property.area_sqft && (
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.area_sqft} sqft
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {property.description || "No description available for this property."}
                </p>
              </div>

              {property.features && property.features.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3">Features & Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              {/* Contact Agent */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">Professional Agent</div>
                      <div className="text-sm text-muted-foreground">Licensed Real Estate Agent</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="default" size="sm" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium capitalize">{property.property_type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline" className="text-xs">
                      {property.status || 'Available'}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-medium">{formatDate(property.created_at)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-medium">#{property.id.slice(0, 8)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Property Images</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={images[selectedImage]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImage === index 
                          ? "border-primary" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetails;