
export const dummyProperties = [
  {
    id: '1',
    title: 'Modern 3BR Apartment in Westlands',
    description: 'Luxurious 3-bedroom apartment with stunning city views, modern finishes, and premium amenities. Located in the heart of Westlands with easy access to shopping and dining.',
    price: 12500000,
    location: 'Westlands, Nairobi',
    property_type: 'apartment' as const,
    bedrooms: 3,
    bathrooms: 2,
    area_sqft: 1800,
    features: ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Balcony', 'Modern Kitchen'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    status: 'available' as const,
  },
  {
    id: '2',
    title: 'Spacious 4BR Villa in Karen',
    description: 'Beautiful family villa with large garden, swimming pool, and servant quarters. Perfect for families looking for space and tranquility while staying close to the city.',
    price: 28000000,
    location: 'Karen, Nairobi',
    property_type: 'house' as const,
    bedrooms: 4,
    bathrooms: 3,
    area_sqft: 3200,
    features: ['Swimming Pool', 'Garden', 'Servant Quarters', 'Fireplace', 'Study Room', 'Double Garage'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop'
    ],
    status: 'available' as const,
  },
  {
    id: '3',
    title: 'Commercial Office Space in CBD',
    description: 'Prime commercial office space in the Central Business District. Ideal for businesses looking for a prestigious address with excellent connectivity and modern facilities.',
    price: 45000000,
    location: 'CBD, Nairobi',
    property_type: 'commercial' as const,
    bedrooms: null,
    bathrooms: 4,
    area_sqft: 5500,
    features: ['Conference Rooms', 'Reception Area', 'Parking', '24/7 Security', 'Backup Generator', 'High-Speed Internet'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop'
    ],
    status: 'available' as const,
  },
  {
    id: '4',
    title: 'Cozy 2BR Apartment in Kilimani',
    description: 'Well-maintained 2-bedroom apartment in a quiet residential area. Perfect for young professionals and small families. Close to amenities and public transport.',
    price: 8500000,
    location: 'Kilimani, Nairobi',
    property_type: 'apartment' as const,
    bedrooms: 2,
    bathrooms: 1,
    area_sqft: 1200,
    features: ['Parking', 'Security', 'Water Backup', 'Close to Mall', 'Public Transport'],
    images: [
      'https://images.unsplash.com/photo-1600566752734-235cb2414bb2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
    ],
    status: 'available' as const,
  },
  {
    id: '5',
    title: '1 Acre Land in Kiambu',
    description: 'Prime residential land with ready title deed. Perfect for development or investment. Located in a rapidly growing area with good infrastructure development.',
    price: 15000000,
    location: 'Kiambu County',
    property_type: 'land' as const,
    bedrooms: null,
    bathrooms: null,
    area_sqft: 43560, // 1 acre in sq ft
    features: ['Title Deed Ready', 'Good Road Access', 'Electricity Connection', 'Water Connection', 'Gated Community'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
    ],
    status: 'available' as const,
  },
  {
    id: '6',
    title: 'Luxury Penthouse in Upper Hill',
    description: 'Exclusive penthouse with panoramic city views. Features include private terrace, jacuzzi, and premium finishes throughout. The epitome of luxury living in Nairobi.',
    price: 55000000,
    location: 'Upper Hill, Nairobi',
    property_type: 'apartment' as const,
    bedrooms: 4,
    bathrooms: 4,
    area_sqft: 4200,
    features: ['Jacuzzi', 'Private Terrace', 'City Views', 'Concierge Service', 'Wine Cellar', 'Smart Home Features'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop'
    ],
    status: 'available' as const,
  }
];

export const getDummyProperties = () => dummyProperties;

export const getDummyPropertyById = (id: string) => {
  return dummyProperties.find(property => property.id === id);
};
