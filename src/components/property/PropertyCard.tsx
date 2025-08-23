import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Bed, Bath, Square, Heart, Phone, MessageCircle, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  property_type: 'house' | 'apartment' | 'commercial' | 'land';
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  features: string[];
  images: string[];
  status: 'available' | 'sold' | 'rented';
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleCall = () => {
    toast({
      title: "Calling Agent",
      description: "This would initiate a call to the property agent.",
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your inquiry has been sent to the agent.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Property link copied to clipboard.",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-medium transition-spring overflow-hidden">
      <div className="relative">
        {property.images.length > 0 ? (
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
        
        <div className="absolute top-2 left-2">
          <Badge variant={property.status === 'available' ? 'default' : 'secondary'}>
            {property.status}
          </Badge>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
        </Button>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary">
              {formatPrice(property.price)}
            </div>
            <div className="text-xs text-muted-foreground capitalize">
              {property.property_type}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Property Details */}
          {(property.bedrooms || property.bathrooms || property.area_sqft) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {property.bedrooms && (
                <div className="flex items-center gap-1">
                  <Bed className="w-3 h-3" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath className="w-3 h-3" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              {property.area_sqft && (
                <div className="flex items-center gap-1">
                  <Square className="w-3 h-3" />
                  <span>{property.area_sqft} sq ft</span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {property.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {property.description}
            </p>
          )}

          {/* Features */}
          {property.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{property.features.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleCall} size="sm" className="flex-1">
              <Phone className="w-3 h-3 mr-1" />
              Call
            </Button>
            <Button onClick={handleMessage} variant="outline" size="sm" className="flex-1">
              <MessageCircle className="w-3 h-3 mr-1" />
              Message
            </Button>
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="w-3 h-3" />
            </Button>
          </div>

          {/* View Details Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{property.title}</DialogTitle>
                <DialogDescription>
                  {property.location} • {formatPrice(property.price)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Image Gallery */}
                {property.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Property Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">Price</div>
                  </div>
                  {property.bedrooms && (
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-foreground">
                        {property.bedrooms}
                      </div>
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-foreground">
                        {property.bathrooms}
                      </div>
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
                    </div>
                  )}
                  {property.area_sqft && (
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-foreground">
                        {property.area_sqft}
                      </div>
                      <div className="text-sm text-muted-foreground">Sq Ft</div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {property.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{property.description}</p>
                  </div>
                )}

                {/* Features */}
                {property.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button onClick={handleCall} className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button onClick={handleMessage} variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button onClick={handleShare} variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;