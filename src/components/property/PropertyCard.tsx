
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Bed, Bath, Square, Heart, Phone, MessageCircle, Share2, Calendar } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();

  const handleCall = () => {
    // Simulate calling functionality
    toast({
      title: "Calling Agent",
      description: `Connecting you to the agent for ${property.title}. Phone: +254-700-123-456`,
    });
    
    // In a real app, this would initiate a phone call or open the dialer
    console.log(`Calling agent for property: ${property.id}`);
  };

  const handleMessage = () => {
    // Simulate messaging functionality
    toast({
      title: "Message Sent",
      description: "Your inquiry has been sent to the property agent. They'll respond within 24 hours.",
    });
    
    // In a real app, this would open a chat interface or send an email
    const message = `Hi, I'm interested in the property "${property.title}" located at ${property.location}. Could you please provide more details?`;
    console.log(`Message for property ${property.id}:`, message);
  };

  const handleShare = async () => {
    // Simulate sharing functionality
    const shareData = {
      title: property.title,
      text: `Check out this amazing property: ${property.title} in ${property.location}`,
      url: `${window.location.origin}/property/${property.id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Property Shared",
          description: "Property details shared successfully!",
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`);
        toast({
          title: "Link Copied",
          description: "Property link copied to clipboard!",
        });
      }
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Could not share property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleScheduleViewing = () => {
    toast({
      title: "Viewing Scheduled",
      description: "A viewing appointment request has been sent. The agent will contact you to confirm the time.",
    });
    
    console.log(`Scheduling viewing for property: ${property.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const displayImages = property.images.length > 0 ? property.images : [
    `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop`
  ];

  return (
    <Card className="group hover:shadow-medium transition-spring overflow-hidden">
      <div className="relative">
        <img 
          src={displayImages[0]} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';
          }}
        />
        
        <div className="absolute top-2 left-2">
          <Badge variant={property.status === 'available' ? 'default' : 'secondary'}>
            {property.status}
          </Badge>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
          onClick={() => {
            setIsLiked(!isLiked);
            toast({
              title: isLiked ? "Removed from favorites" : "Added to favorites",
              description: isLiked ? "Property removed from your favorites" : "Property saved to your favorites",
            });
          }}
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

          {/* Schedule Viewing Button */}
          <Button onClick={handleScheduleViewing} variant="secondary" className="w-full">
            <Calendar className="w-3 h-3 mr-2" />
            Schedule Viewing
          </Button>

          {/* View Details Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full">
                View Full Details
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
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={displayImages[selectedImage]}
                      alt={property.title}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                  </div>
                  
                  {displayImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {displayImages.map((img, index) => (
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

                {/* Property Info Grid */}
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
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </div>
                )}

                {/* Features */}
                {property.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features & Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="justify-start">
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
                  <Button onClick={handleScheduleViewing} variant="secondary" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Viewing
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
