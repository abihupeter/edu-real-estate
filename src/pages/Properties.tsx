
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PropertyCard from '@/components/property/PropertyCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Home } from 'lucide-react';
import { getDummyProperties } from '@/utils/dummyProperties';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [location, setLocation] = useState('');

  const { data: dbProperties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Use dummy properties if no database properties exist
  const dummyProperties = getDummyProperties();
  const properties = dbProperties && dbProperties.length > 0 ? dbProperties : dummyProperties;

  const filteredProperties = properties?.filter((property) => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.description && property.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = propertyType === 'all' || property.property_type === propertyType;
    
    const matchesLocation = !location || property.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesPrice = (() => {
      if (priceRange === 'all') return true;
      const price = property.price;
      switch (priceRange) {
        case 'under-10m':
          return price < 10000000;
        case '10m-20m':
          return price >= 10000000 && price <= 20000000;
        case '20m-50m':
          return price >= 20000000 && price <= 50000000;
        case 'over-50m':
          return price > 50000000;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  }).map(property => ({
    ...property,
    property_type: property.property_type as 'house' | 'apartment' | 'commercial' | 'land',
    status: property.status as 'available' | 'sold' | 'rented'
  })) || [];

  const clearFilters = () => {
    setSearchTerm('');
    setPropertyType('all');
    setPriceRange('all');
    setLocation('');
  };

  const activeFiltersCount = [
    searchTerm,
    propertyType !== 'all' ? propertyType : null,
    priceRange !== 'all' ? priceRange : null,
    location
  ].filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Properties for Sale
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your dream property from our extensive collection of homes, apartments, and commercial spaces.
          </p>
          {!dbProperties || dbProperties.length === 0 && (
            <Badge variant="outline" className="mt-4">
              <Home className="w-3 h-3 mr-1" />
              Showing Demo Properties
            </Badge>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-6 shadow-soft mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Property Type Filter */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-10m">Under KSh 10M</SelectItem>
                <SelectItem value="10m-20m">KSh 10M - 20M</SelectItem>
                <SelectItem value="20m-50m">KSh 20M - 50M</SelectItem>
                <SelectItem value="over-50m">Over KSh 50M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters and Clear Button */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {filteredProperties.length} Properties Found
          </h2>
          
          {error && (
            <Badge variant="destructive">
              Using demo data due to connection error
            </Badge>
          )}
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
