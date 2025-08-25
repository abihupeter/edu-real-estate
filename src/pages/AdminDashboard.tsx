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
import { Plus, Edit, Trash2, Home, Building2, MapPin, DollarSign, Users, AlertCircle, UserCheck, Tractor, Phone, Mail, Award, User } from 'lucide-react';

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

interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  experience: string;
  specialization: string;
  location: string;
  completedDeals: number;
  languages: string[];
  certifications: string[];
  serviceType: string;
  rating: number;
  available: boolean;
}

interface ServiceType {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const AdminDashboard = () => {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [professionalDialogOpen, setProfessionalDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');

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

  // Professional form state
  const [professionalFormData, setProfessionalFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    experience: '',
    specialization: '',
    location: '',
    completedDeals: '',
    languages: '',
    certifications: '',
    serviceType: '',
    rating: '',
    available: true
  });

  const isAgent = profile?.role === 'agent' || profile?.role === 'admin';

  useEffect(() => {
    if (!user || !isAgent) return;
    fetchProperties();
    fetchProfessionals();
    initializeServiceTypes();
  }, [user, isAgent]);

  const initializeServiceTypes = () => {
    // Initialize with predefined service types
    const defaultServiceTypes: ServiceType[] = [
      { id: '1', title: 'House Agent', description: 'Professional residential property agents', category: 'Agent Services', icon: 'Home' },
      { id: '2', title: 'Shop Agent', description: 'Commercial property specialists', category: 'Agent Services', icon: 'Building2' },
      { id: '3', title: 'Shamba Agent', description: 'Agricultural land and farm property experts', category: 'Agent Services', icon: 'Tractor' },
      { id: '4', title: 'House Girl', description: 'Reliable domestic workers for household management', category: 'Domestic Services', icon: 'UserCheck' },
      { id: '5', title: 'House Boy', description: 'Trusted domestic workers for general household duties', category: 'Domestic Services', icon: 'Users' },
      { id: '6', title: 'Rental Agent', description: 'Specialized agents for rental properties', category: 'Agent Services', icon: 'Home' },
    ];
    setServiceTypes(defaultServiceTypes);
  };

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

  const fetchProfessionals = async () => {
    // For now, we'll use localStorage to store professionals since we don't have a professionals table
    try {
      const stored = localStorage.getItem('professionals');
      if (stored) {
        setProfessionals(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error fetching professionals:', error);
    }
  };

  const saveProfessionals = (professionalsData: Professional[]) => {
    localStorage.setItem('professionals', JSON.stringify(professionalsData));
    setProfessionals(professionalsData);
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

  const resetProfessionalForm = () => {
    setProfessionalFormData({
      name: '',
      email: '',
      phone: '',
      avatar: '',
      experience: '',
      specialization: '',
      location: '',
      completedDeals: '',
      languages: '',
      certifications: '',
      serviceType: '',
      rating: '',
      available: true
    });
    setEditingProfessional(null);
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

  const handleProfessionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const professionalData: Professional = {
        id: editingProfessional?.id || `prof_${Date.now()}`,
        name: professionalFormData.name,
        email: professionalFormData.email,
        phone: professionalFormData.phone,
        avatar: professionalFormData.avatar || '/placeholder.svg',
        experience: professionalFormData.experience,
        specialization: professionalFormData.specialization,
        location: professionalFormData.location,
        completedDeals: parseInt(professionalFormData.completedDeals) || 0,
        languages: professionalFormData.languages.split(',').map(l => l.trim()).filter(Boolean),
        certifications: professionalFormData.certifications.split(',').map(c => c.trim()).filter(Boolean),
        serviceType: professionalFormData.serviceType,
        rating: parseFloat(professionalFormData.rating) || 4.5,
        available: professionalFormData.available
      };

      let updatedProfessionals;
      if (editingProfessional) {
        updatedProfessionals = professionals.map(p => 
          p.id === editingProfessional.id ? professionalData : p
        );
      } else {
        updatedProfessionals = [...professionals, professionalData];
      }

      saveProfessionals(updatedProfessionals);

      toast({
        title: "Success",
        description: `Professional ${editingProfessional ? 'updated' : 'added'} successfully`,
      });

      resetProfessionalForm();
      setProfessionalDialogOpen(false);
    } catch (error) {
      console.error('Error saving professional:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingProfessional ? 'update' : 'add'} professional`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProfessional = (professional: Professional) => {
    setEditingProfessional(professional);
    setProfessionalFormData({
      name: professional.name,
      email: professional.email,
      phone: professional.phone,
      avatar: professional.avatar,
      experience: professional.experience,
      specialization: professional.specialization,
      location: professional.location,
      completedDeals: professional.completedDeals.toString(),
      languages: professional.languages.join(', '),
      certifications: professional.certifications.join(', '),
      serviceType: professional.serviceType,
      rating: professional.rating.toString(),
      available: professional.available
    });
    setProfessionalDialogOpen(true);
  };

  const handleDeleteProfessional = (professionalId: string) => {
    if (!confirm('Are you sure you want to delete this professional?')) return;

    try {
      const updatedProfessionals = professionals.filter(p => p.id !== professionalId);
      saveProfessionals(updatedProfessionals);

      toast({
        title: "Success",
        description: "Professional deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting professional:', error);
      toast({
        title: "Error",
        description: "Failed to delete professional",
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
              Manage properties and professional services
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="professionals" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Professionals
            </TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Property Management</h2>
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
          </TabsContent>

          {/* Professionals Tab */}
          <TabsContent value="professionals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Professional Services Management</h2>
              <Dialog open={professionalDialogOpen} onOpenChange={setProfessionalDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetProfessionalForm} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Professional
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProfessional ? 'Edit Professional' : 'Add New Professional'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProfessional ? 'Update' : 'Add'} professional details below.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleProfessionalSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prof-name">Name *</Label>
                        <Input
                          id="prof-name"
                          value={professionalFormData.name}
                          onChange={(e) => setProfessionalFormData({ ...professionalFormData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prof-email">Email *</Label>
                        <Input
                          id="prof-email"
                          type="email"
                          value={professionalFormData.email}
                          onChange={(e) => setProfessionalFormData({ ...professionalFormData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prof-phone">Phone *</Label>
                        <Input
                          id="prof-phone"
                          value={professionalFormData.phone}
                          onChange={(e) => setProfessionalFormData({ ...professionalFormData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prof-location">Location *</Label>
                        <Input
                          id="prof-location"
                          value={professionalFormData.location}
                          onChange={(e) => setProfessionalFormData({ ...professionalFormData, location: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prof-service">Service Type *</Label>
                        <Select 
                          value={professionalFormData.serviceType} 
                          onValueChange={(value) => setProfessionalFormData({ ...professionalFormData, serviceType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((service) => (
                              <SelectItem key={service.id} value={service.title}>
                                {service.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prof-experience">Experience *</Label>
                        <Input
                          id="prof-experience"
                          value={professionalFormData.experience}
                          onChange={(e) => setProfessionalFormData({ ...professionalFormData, experience: e.target.value })}
                          placeholder="e.g. 5 years"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prof-specialization">Specialization *</Label>
                      <Input
                        id="prof-specialization"
                        value={professionalFormData.specialization}
                        onChange={(e) => setProfessionalFormData({ ...professionalFormData, specialization: e.target.value })}
                        placeholder="e.g. Luxury Homes, Commercial Properties"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prof-deals">Completed Deals</Label>
                        <Input
                          id="prof-deals"
                          type="number"
                          value={professionalFormData.completedDeals}
                          onChange={(e) => setProfessionalFormData({ ...professionalFormData, completedDeals: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prof-rating">Rating</Label>
                        <Input
                          id="prof-rating"
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={professionalFormData.rating}
                          onChange={(e) => setProfessionalFormData({ ...professionalFormData, rating: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prof-available">Available</Label>
                        <Select 
                          value={professionalFormData.available.toString()} 
                          onValueChange={(value) => setProfessionalFormData({ ...professionalFormData, available: value === 'true' })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prof-languages">Languages (comma-separated)</Label>
                      <Input
                        id="prof-languages"
                        value={professionalFormData.languages}
                        onChange={(e) => setProfessionalFormData({ ...professionalFormData, languages: e.target.value })}
                        placeholder="e.g. English, Swahili, French"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prof-certifications">Certifications (comma-separated)</Label>
                      <Textarea
                        id="prof-certifications"
                        value={professionalFormData.certifications}
                        onChange={(e) => setProfessionalFormData({ ...professionalFormData, certifications: e.target.value })}
                        placeholder="e.g. Licensed Real Estate Agent, Property Management"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prof-avatar">Avatar URL</Label>
                      <Input
                        id="prof-avatar"
                        value={professionalFormData.avatar}
                        onChange={(e) => setProfessionalFormData({ ...professionalFormData, avatar: e.target.value })}
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setProfessionalDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'Saving...' : editingProfessional ? 'Update' : 'Add'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Professionals List */}
            <div className="space-y-6">
              {professionals.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No professionals found</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by adding your first professional
                    </p>
                    <Button onClick={() => setProfessionalDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Professional
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {professionals.map((professional) => (
                    <Card key={professional.id} className="hover:shadow-medium transition-spring">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{professional.name}</CardTitle>
                              <div className="text-sm text-muted-foreground">{professional.serviceType}</div>
                            </div>
                          </div>
                          <Badge variant={professional.available ? 'default' : 'secondary'}>
                            {professional.available ? 'Available' : 'Unavailable'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <Award className="w-4 h-4 mr-2 text-muted-foreground" />
                            {professional.specialization}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                            {professional.location}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                            {professional.phone}
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                            {professional.email}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>{professional.experience} experience</span>
                            <span>{professional.completedDeals} deals</span>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm" onClick={() => handleEditProfessional(professional)}>
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteProfessional(professional.id)}>
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
