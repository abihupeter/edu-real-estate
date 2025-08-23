import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Home, Building2, MapPin, DollarSign, Users, AlertCircle } from 'lucide-react';

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
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    property_type: 'house' as Property['property_type'],
    bedrooms: '',
    bathrooms: '',
    area_sqft: '',
    features: '',
    images: '',
    status: 'available' as Property['status']
  });

  const isAgent = profile?.role === 'agent' || profile?.role === 'admin';

  useEffect(() => {
    if (!user || !isAgent) return;
    fetchProperties();
  }, [user, isAgent]);

  const fetchProperties = async () => {
    try {
      let query = supabase.from('properties').select('*');
      
      // If agent (not admin), only show their properties
      if (profile?.role === 'agent') {
        query = query.eq('agent_id', profile.id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setProperties((data || []) as Property[]);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to fetch properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      property_type: 'house',
      bedrooms: '',
      bathrooms: '',
      area_sqft: '',
      features: '',
      images: '',
      status: 'available'
    });
    setEditingProperty(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;

    setSubmitting(true);

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description || null,
        price: parseFloat(formData.price),
        location: formData.location,
        property_type: formData.property_type,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area_sqft: formData.area_sqft ? parseInt(formData.area_sqft) : null,
        features: formData.features ? formData.features.split(',').map(f => f.trim()).filter(Boolean) : [],
        images: formData.images ? formData.images.split(',').map(img => img.trim()).filter(Boolean) : [],
        status: formData.status,
        agent_id: profile.id
      };

      let error;
      if (editingProperty) {
        const { error: updateError } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', editingProperty.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('properties')
          .insert([propertyData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: `Property ${editingProperty ? 'updated' : 'created'} successfully`,
      });

      resetForm();
      setDialogOpen(false);
      fetchProperties();
    } catch (error) {
      console.error('Error saving property:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingProperty ? 'update' : 'create'} property`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description || '',
      price: property.price.toString(),
      location: property.location,
      property_type: property.property_type,
      bedrooms: property.bedrooms?.toString() || '',
      bathrooms: property.bathrooms?.toString() || '',
      area_sqft: property.area_sqft?.toString() || '',
      features: property.features.join(', '),
      images: property.images.join(', '),
      status: property.status
    });
    setDialogOpen(true);
  };

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property deleted successfully",
      });

      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please sign in to access the admin dashboard.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!isAgent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You don't have permission to access this page. Only agents and admins can manage properties.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your properties and listings
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </DialogTitle>
                <DialogDescription>
                  {editingProperty ? 'Update' : 'Create'} property details below.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property_type">Property Type *</Label>
                    <Select value={formData.property_type} onValueChange={(value: any) => setFormData({ ...formData, property_type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                        <SelectItem value="rented">Rented</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area_sqft">Area (sq ft)</Label>
                    <Input
                      id="area_sqft"
                      type="number"
                      value={formData.area_sqft}
                      onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="e.g. Swimming Pool, Parking, Garden"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Image URLs (comma-separated)</Label>
                  <Textarea
                    id="images"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    placeholder="e.g. https://example.com/image1.jpg, https://example.com/image2.jpg"
                    rows={2}
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : editingProperty ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Properties List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first property listing
                </p>
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="hover:shadow-medium transition-spring">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{property.title}</CardTitle>
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.location}
                        </div>
                      </div>
                      <Badge variant={property.status === 'available' ? 'default' : 'secondary'}>
                        {property.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-primary font-semibold">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {property.price.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Building2 className="w-3 h-3" />
                          {property.property_type}
                        </div>
                      </div>

                      {(property.bedrooms || property.bathrooms || property.area_sqft) && (
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {property.bedrooms && <span>{property.bedrooms} bed</span>}
                          {property.bathrooms && <span>{property.bathrooms} bath</span>}
                          {property.area_sqft && <span>{property.area_sqft} sq ft</span>}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(property)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(property.id)}>
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;