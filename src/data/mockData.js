// Mock data for testing the application without a backend

export const mockRestaurants = [
  // Chennai Restaurants
  {
    id: '1',
    name: 'Saravana Bhavan',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fsouth-indian-food&psig=AOvVaw3aNKUrRXF8cPnmFcuuNKlx&ust=1763477524356000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNiT3vG3-ZADFQAAAAAdAAAAABAE',
    cuisine: 'South Indian',
    rating: 4.6,
    reviewCount: 2850,
    deliveryTime: '25-35 min',
    deliveryFee: 25,
    minOrder: 150,
    isOpen: true,
    discount: 10,
    description: 'Authentic South Indian vegetarian cuisine since 1981. Famous for dosas, idlis, and filter coffee.',
    phone: '+91 44 2434 4999',
    address: 'T. Nagar, Chennai, Tamil Nadu 600017',
    city: 'Chennai',
    area: 'T. Nagar',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    tags: ['Vegetarian', 'Traditional', 'Dosa', 'Idli'],
    priceRange: 2,
    featured: true
  },
  {
    id: '2',
    name: 'Anjappar Chettinad Restaurant',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    cuisine: 'Chettinad',
    rating: 4.4,
    reviewCount: 1920,
    deliveryTime: '30-40 min',
    deliveryFee: 30,
    minOrder: 200,
    isOpen: true,
    description: 'Authentic Chettinad cuisine with traditional spices. Famous for mutton and chicken dishes.',
    phone: '+91 44 2618 6300',
    address: 'Anna Nagar, Chennai, Tamil Nadu 600040',
    city: 'Chennai',
    area: 'Anna Nagar',
    coordinates: { lat: 13.0850, lng: 80.2101 },
    tags: ['Non-Vegetarian', 'Spicy', 'Mutton', 'Chicken'],
    priceRange: 3,
    featured: true
  },
  {
    id: '3',
    name: 'Murugan Idli Shop',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
    cuisine: 'South Indian',
    rating: 4.5,
    reviewCount: 3200,
    deliveryTime: '15-25 min',
    deliveryFee: 20,
    minOrder: 100,
    isOpen: true,
    discount: 15,
    description: 'Famous for soft idlis and crispy vadas. A Chennai breakfast institution.',
    phone: '+91 44 2491 2684',
    address: 'Besant Nagar, Chennai, Tamil Nadu 600090',
    city: 'Chennai',
    area: 'Besant Nagar',
    coordinates: { lat: 13.0067, lng: 80.2669 },
    tags: ['Vegetarian', 'Breakfast', 'Idli', 'Vada'],
    priceRange: 1,
    featured: false
  },
  {
    id: '4',
    name: 'Ponnusamy Hotel',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    cuisine: 'Chettinad',
    rating: 4.3,
    reviewCount: 1650,
    deliveryTime: '35-45 min',
    deliveryFee: 35,
    minOrder: 250,
    isOpen: true,
    description: 'Traditional Chettinad non-vegetarian specialties. Famous for biryani and seafood.',
    phone: '+91 44 2819 2345',
    address: 'Egmore, Chennai, Tamil Nadu 600008',
    city: 'Chennai',
    area: 'Egmore',
    coordinates: { lat: 13.0732, lng: 80.2609 },
    tags: ['Non-Vegetarian', 'Biryani', 'Mutton', 'Seafood'],
    priceRange: 3,
    featured: false
  },
  {
    id: '5',
    name: 'Ratna Cafe',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
    cuisine: 'South Indian',
    rating: 4.2,
    reviewCount: 890,
    deliveryTime: '20-30 min',
    deliveryFee: 25,
    minOrder: 120,
    isOpen: true,
    description: 'Traditional South Indian tiffin and meals. Known for authentic filter coffee.',
    phone: '+91 44 2858 4567',
    address: 'Triplicane, Chennai, Tamil Nadu 600005',
    city: 'Chennai',
    area: 'Triplicane',
    coordinates: { lat: 13.0569, lng: 80.2707 },
    tags: ['Vegetarian', 'Filter Coffee', 'Tiffin', 'Meals'],
    priceRange: 2,
    featured: false
  },
  // Perundurai Restaurants
  {
    id: '1001',
    name: 'Poongodi Mess',
  image: 'https://static.vecteezy.com/system/resources/thumbnails/068/778/756/small/traditional-south-indian-meal-served-on-banana-leaf-with-rice-and-delicacies-photo.jpeg',
    cuisine: 'South Indian',
    rating: 4.4,
    reviewCount: 320,
    deliveryTime: '20-30 min',
    deliveryFee: 20,
    minOrder: 100,
    isOpen: true,
    discount: 10,
    description: 'Local favorites serving dosa, idli and thali specials in Perundurai.',
    phone: '+91 424 123 4567',
    address: 'R.S Road, Perundurai West, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'Perundurai',
    coordinates: { lat: 11.3500, lng: 77.5333 },
    tags: ['Vegetarian', 'Thali', 'Dosa'],
    priceRange: 1,
    featured: true
  },
  {
    id: '1002',
    name: 'Aachi Mess',
  image: 'https://blogs.mykhana.in/images/hf1.jpg',
    cuisine: 'Home Style',
    rating: 4.2,
    reviewCount: 210,
    deliveryTime: '25-35 min',
    deliveryFee: 25,
    minOrder: 150,
    isOpen: true,
    description: 'Homely meals and biryani, popular with local offices and students.',
    phone: '+91 424 765 4321',
    address: 'Erode Road, Thoppupalayam, Perundurai, Erode – 638060',
    city: 'Perundurai',
    area: 'Perundurai Bus Stand',
    coordinates: { lat: 11.3450, lng: 77.5370 },
    tags: ['Biryani', 'Meals', 'Non-Vegetarian'],
    priceRange: 2,
    featured: false
  },
  /*{
    id: '1003',
    name: 'Perundurai Sweets & Snacks',
  image: '/images/restaurants/1003.svg',
    cuisine: 'Snacks',
    rating: 4.5,
    reviewCount: 140,
    deliveryTime: '15-25 min',
    deliveryFee: 15,
    minOrder: 80,
    isOpen: true,
    description: 'Fresh snacks, sweets and quick bites loved by locals in Perundurai.',
    phone: '+91 424 998 8776',
    address: 'Market Road, Perundurai, Tamil Nadu 638052',
    city: 'Perundurai',
    area: 'Market Road',
    coordinates: { lat: 11.3475, lng: 77.5350 },
    tags: ['Snacks', 'Sweets', 'Quick Bites'],
    priceRange: 1,
    featured: false
  },*/
  // Additional Perundurai Restaurants provided by user
  {
    id: '1004',
    name: "Gayathri Mess",
  image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291dGglMjBpbmRpYW4lMjBmb29kfGVufDB8fDB8fHww',
    cuisine: 'South Indian',
    rating: 4.3,
    reviewCount: 220,
    deliveryTime: '20-30 min',
    deliveryFee: 20,
    minOrder: 100,
    isOpen: true,
    description: "Comfort food and local favorites at Hotel Aadhav's.",
    phone: '+91 424 000 1004',
    address: 'Perundurai New Bus Stand Road, Perundurai, Erode – 6380522',
    city: 'Perundurai',
    area: 'Perundurai',
    coordinates: { lat: 11.3490, lng: 77.5340 },
    tags: ['Local', 'Homestyle'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1005',
    name: 'Royal Chettinad Restaurant',
  image: 'https://www.funfoodfrolic.com/wp-content/uploads/2020/11/Chicken-Chettinad-Thumbnail.jpg',
    cuisine: 'Chettinad',
    rating: 4.4,
    reviewCount: 180,
    deliveryTime: '30-40 min',
    deliveryFee: 0,
    minOrder: 150,
    isOpen: true,
    description: 'Classic Chettinad flavors and spicy curries.',
    phone: '+91 424 000 1005',
    address: 'Near Bus Stand, Perundurai, Tamil Nadu 638052',
    city: 'Perundurai',
    area: 'Bus Stand',
    coordinates: { lat: 11.3465, lng: 77.5360 },
    tags: ['Chettinad', 'Spicy'],
    priceRange: 2,
    featured: false
  },
  {
    id: '1006',
    name: 'Dheeran Mess',
  image: 'https://img.freepik.com/free-photo/delicious-pakistan-meal-basket_23-2148821576.jpg?ga=GA1.1.1090468563.1740596063&semt=ais_hybrid&w=740&q=80',
    cuisine: 'Biryani',
    rating: 4.5,
    reviewCount: 300,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 120,
    isOpen: true,
    description: 'Fragrant biryanis and hearty meals.',
    phone: '+91 424 000 1006',
    address: 'Mullai Nagar, Perundurai West, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'Market Road',
    coordinates: { lat: 11.3478, lng: 77.5345 },
    tags: ['Biryani', 'Non-Veg'],
    priceRange: 2,
    featured: true
  },
  {
    id: '1007',
    name: 'Viswanathan Mess',
  image: 'https://t4.ftcdn.net/jpg/16/49/00/75/240_F_1649007504_GguFZU5JADfVohGM3vJtJqaNSs5RvNVE.jpg',
    cuisine: 'Dhaba',
    rating: 4.1,
    reviewCount: 95,
    deliveryTime: '30-40 min',
    deliveryFee: 25,
    minOrder: 120,
    isOpen: true,
    description: 'Hearty dhaba-style meals and quick platters.',
    phone: '+91 424 000 1007',
    address: 'Chennimalai Road, Perundurai Sanitorium, Perundurai, Erode – 638053',
    city: 'Perundurai',
    area: 'Station Road',
    coordinates: { lat: 11.3455, lng: 77.5380 },
    tags: ['Dhaba', 'Non-Veg'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1008',
    name: 'Kumar Mess',
  image: 'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Multi Cuisine',
    rating: 4.0,
    reviewCount: 140,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 130,
    isOpen: true,
    description: 'Multi-cuisine family restaurant with varied menu.',
    phone: '+91 424 000 1008',
    address: 'R.S Road, Perundurai West, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'Opposite Mall',
    coordinates: { lat: 11.3482, lng: 77.5358 },
    tags: ['Family', 'Multi-Cuisine'],
    priceRange: 2,
    featured: false
  },
  {
    id: '1009',
    name: 'Sakthi Mess',
  image: 'https://images.unsplash.com/photo-1633383718081-22ac93e3db65?q=80&w=1058&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Madurai',
    rating: 4.4,
    reviewCount: 160,
    deliveryTime: '20-30 min',
    deliveryFee: 18,
    minOrder: 120,
    isOpen: true,
    description: 'Madurai-style non-veg specialties and biryanis.',
    phone: '+91 424 000 1009',
    address: 'Chennimalai Road, Perundurai West, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'Temple Area',
    coordinates: { lat: 11.3495, lng: 77.5325 },
    tags: ['Madurai', 'Non-Veg'],
    priceRange: 2,
    featured: false
  },
  {
    id: '1010',
    name: 'Sri Sakthi Mess',
  image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'South Indian',
    rating: 4.2,
    reviewCount: 110,
    deliveryTime: '20-30 min',
    deliveryFee: 20,
    minOrder: 100,
    isOpen: true,
    description: 'Comfortable dining and quick service.',
    phone: '+91 424 000 1010',
    address: 'Near G.H, Perundurai West, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'Main Junction',
    coordinates: { lat: 11.3502, lng: 77.5339 },
    tags: ['Hotel', 'Family'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1011',
    name: 'Prakash Mess',
  image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Multi Cuisine',
    rating: 4.0,
    reviewCount: 90,
    deliveryTime: '25-35 min',
    deliveryFee: 22,
    minOrder: 120,
    isOpen: true,
    description: 'Homely meals and quick bites.',
    phone: '+91 424 000 1011',
    address: 'Erode Road, Perundurai West, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'Lake Road',
    coordinates: { lat: 11.3468, lng: 77.5365 },
    tags: ['Homestyle', 'Quick Bites'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1012',
    name: 'Sri Annam Mess',
  image: 'https://images.unsplash.com/photo-1642821372878-9004c24b7897?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Family',
    rating: 4.1,
    reviewCount: 130,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 140,
    isOpen: true,
    description: 'Family-friendly dining with varied menu.',
    phone: '+91 424 000 1012',
    address: 'Chennimalai Road, Perundurai West, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'Ring Road',
    coordinates: { lat: 11.3489, lng: 77.5332 },
    tags: ['Family', 'Multi-Cuisine'],
    priceRange: 2,
    featured: false
  },
  {
    id: '1013',
    name: 'Ayya Mess',
  image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D',
    cuisine: 'Home Style',
    rating: 4.0,
    reviewCount: 85,
    deliveryTime: '20-30 min',
    deliveryFee: 18,
    minOrder: 100,
    isOpen: true,
    description: 'Comfort food perfect for family meals.',
    phone: '+91 424 000 1013',
    address: 'Thai Nagar, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'North Street',
    coordinates: { lat: 11.3470, lng: 77.5348 },
    tags: ['Family', 'Homestyle'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1014',
    name: 'Sri Adithya Chettinadu Mess',
  image: 'https://images.unsplash.com/photo-1627042633145-b780d842ba45?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Mess',
    rating: 4.2,
    reviewCount: 150,
    deliveryTime: '20-30 min',
    deliveryFee: 15,
    minOrder: 90,
    isOpen: true,
    description: 'Budget meals and thali specials for locals.',
    phone: '+91 424 000 1014',
    address: 'Bhavani Main Road, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'South Bazaar',
    coordinates: { lat: 11.3462, lng: 77.5352 },
    tags: ['Thali', 'Budget'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1015',
    name: 'Sri Nithya Mess',
  image: 'https://media.istockphoto.com/id/1410130688/photo/mutton-biryani-served-in-a-golden-dish-isolated-on-dark-background-side-view-indian-food.webp?s=612x612&w=is&k=20&c=8LRMd7I9m-e3vGSqhbt6KN-LC6YodhfyRmaHmc9PxM0=',
    cuisine: 'Mess',
    rating: 4.3,
    reviewCount: 170,
    deliveryTime: '25-35 min',
    deliveryFee: 18,
    minOrder: 100,
    isOpen: true,
    description: 'Popular mess serving full meals and biryani.',
    phone: '+91 424 000 1015',
    address: 'Perundurai HO, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'North Bazaar',
    coordinates: { lat: 11.3480, lng: 77.5368 },
    tags: ['Meals', 'Biryani'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1016',
    name: 'Jothi Bhavan',
  image: 'https://images.pexels.com/photos/10219670/pexels-photo-10219670.jpeg',
    cuisine: 'South Indian',
    rating: 4.1,
    reviewCount: 105,
    deliveryTime: '20-30 min',
    deliveryFee: 15,
    minOrder: 90,
    isOpen: true,
    description: 'Traditional tiffin and meals.',
    phone: '+91 424 000 1016',
    address: 'Old Town, Perundurai, Tamil Nadu 638052',
    city: 'Perundurai',
    area: 'Old Town',
    coordinates: { lat: 11.3498, lng: 77.5328 },
    tags: ['Tiffin', 'Vegetarian'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1017',
    name: 'Sri Amman Mess',
  image: 'https://media.istockphoto.com/id/1292563627/photo/assorted-south-indian-breakfast-foods-on-wooden-background-ghee-dosa-uttappam-medhu-vada.jpg?s=612x612&w=0&k=20&c=HvuYT3RiWj5YsvP2_pJrSWIcZUXhnTKqjKhdN3j_SgY=',
    cuisine: 'Family',
    rating: 4.2,
    reviewCount: 125,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 140,
    isOpen: true,
    description: 'Garden-side dining and family platters.',
    phone: '+91 424 000 1017',
    address: 'GNarayana Layout, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'Garden Road',
    coordinates: { lat: 11.3505, lng: 77.5350 },
    tags: ['Garden', 'Family'],
    priceRange: 2,
    featured: false
  },
  {
    id: '1018',
    name: 'A1-Konkunadu Mess',
  image: 'https://media.istockphoto.com/id/1263816824/photo/south-indian%C2%A0style-lunch-or-dinner-meal-or-food-served-with-a-selection-of-recipes-over.jpg?s=612x612&w=is&k=20&c=qofemaQK1iHgtS6SKfhkWQpLzz5nq7wXNKtW_EyDK3c=',
    cuisine: 'Fast Food',
    rating: 4.0,
    reviewCount: 80,
    deliveryTime: '15-25 min',
    deliveryFee: 12,
    minOrder: 80,
    isOpen: true,
    description: 'Quick bites, sandwiches and combo meals.',
    phone: '+91 424 000 1018',
    address: 'Vavikadai, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'College Road',
    coordinates: { lat: 11.3472, lng: 77.5322 },
    tags: ['Fast Food', 'Quick Bites'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1019',
    name: 'Ajmeer Biryani & Fast Food',
  image: 'https://media.istockphoto.com/id/980037112/photo/gosht-or-lamb-biryani-prepared-in-basmati-rice-served-with-yogurt-dip-in-terracotta-bowl.jpg?s=612x612&w=0&k=20&c=LY0r5y0tij9MHz2tg802UQGHk-VPUNUYj6x6qGm2bsU=',
    cuisine: 'Biryani',
    rating: 4.3,
    reviewCount: 95,
    deliveryTime: '20-30 min',
    deliveryFee: 15,
    minOrder: 90,
    isOpen: true,
    description: 'Biryani and quick fast food combos.',
    phone: '+91 424 000 1019',
    address: 'East Road, Perundurai, Tamil Nadu 638052',
    city: 'Perundurai',
    area: 'East Road',
    coordinates: { lat: 11.3485, lng: 77.5361 },
    tags: ['Biryani', 'Fast Food'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1020',
    name: 'Kongu Panju Parotta Stall',
  image: 'https://as1.ftcdn.net/v2/jpg/17/57/62/66/1000_F_1757626699_FOUxcy1bwYKTmdFXJRGnQxv1BuVw025j.jpg',
    cuisine: 'Street Food',
    rating: 4.5,
    reviewCount: 210,
    deliveryTime: '15-25 min',
    deliveryFee: 10,
    minOrder: 60,
    isOpen: true,
    description: 'Famous Kongu-style panju parotta and sides.',
    phone: '+91 424 000 1020',
    address: 'Food Street, Perundurai, Tamil Nadu 638052',
    city: 'Perundurai',
    area: 'Food Street',
    coordinates: { lat: 11.3479, lng: 77.5341 },
    tags: ['Street Food', 'Parotta'],
    priceRange: 1,
    featured: true
  },
  {
    id: '1021',
    name: 'Sri Ganapathy Mess',
  image: 'https://images.unsplash.com/photo-1606843046080-45bf7a23c39f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cuisine: 'Mess',
    rating: 4.1,
    reviewCount: 100,
    deliveryTime: '20-30 min',
    deliveryFee: 15,
    minOrder: 90,
    isOpen: true,
    description: 'Popular mess for daily commuters and workers.',
    phone: '+91 424 000 1021',
    address: 'Industrial Area, Perundurai, Tamil Nadu 638052',
    city: 'Perundurai',
    area: 'Industrial Area',
    coordinates: { lat: 11.3458, lng: 77.5319 },
    tags: ['Mess', 'Budget'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1022',
    name: 'Iyer Mess (Pure Veg)',
  image: 'https://media.istockphoto.com/id/1336525712/photo/beetroot-paratha-is-a-indian-pan-fried-whole-wheat-flatbread-made-of-wheat-flour-kneaded-with.jpg?s=612x612&w=is&k=20&c=j-XDBeylyegFQNpuvpTfTh5UmUnvbn9XbFBSqhSBtNE=',
    cuisine: 'Vegetarian',
    rating: 4.4,
    reviewCount: 145,
    deliveryTime: '20-30 min',
    deliveryFee: 15,
    minOrder: 90,
    isOpen: true,
    description: 'Pure vegetarian restaurant with traditional meals.',
    phone: '+91 424 000 1022',
    address: 'Perundurai West, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'West Street',
    coordinates: { lat: 11.3460, lng: 77.5335 },
    tags: ['Vegetarian', 'Thali'],
    priceRange: 1,
    featured: false
  },
  {
    id: '1023',
    name: 'Kongu Canteen',
  image: 'https://clubmahindra.gumlet.io/blog/images/Chicken-Chettinad-resized.jpg?w=576&dpr=1.3',
    cuisine: 'Multi Cuisine',
    rating: 4.2,
    reviewCount: 120,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 130,
    isOpen: true,
    description: 'Comfortable dining with popular local recipes.',
    phone: '+91 424 000 1023',
    address: 'Erode-Perundurai Road, Kumaran Nagar, Perundurai, Erode – 638052',
    city: 'Perundurai',
    area: 'Central Plaza',
    coordinates: { lat: 11.3492, lng: 77.5355 },
    tags: ['Family', 'Local'],
    priceRange: 2,
    featured: false
  },
  // Coimbatore Restaurants
  /*{
    id: '6',
    name: 'Annapoorna Gowrishankar',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    cuisine: 'South Indian',
    rating: 4.5,
    reviewCount: 2100,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 150,
    isOpen: true,
    discount: 20,
    description: 'Famous for traditional sweets and South Indian meals. A Coimbatore institution.',
    phone: '+91 422 2544 789',
    address: 'RS Puram, Coimbatore, Tamil Nadu 641002',
    city: 'Coimbatore',
    area: 'RS Puram',
    coordinates: { lat: 11.0168, lng: 76.9558 },
    tags: ['Vegetarian', 'Sweets', 'Snacks', 'Meals'],
    priceRange: 2,
    featured: true
  },
  {
    id: '7',
    name: 'Hari Bhavaani',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    cuisine: 'Multi Cuisine',
    rating: 4.4,
    reviewCount: 1450,
    deliveryTime: '20-30 min',
    deliveryFee: 25,
    minOrder: 180,
    isOpen: true,
    description: 'Multi-cuisine vegetarian restaurant with North Indian, Chinese, and South Indian dishes.',
    phone: '+91 422 2230 456',
    address: 'Gandhipuram, Coimbatore, Tamil Nadu 641012',
    city: 'Coimbatore',
    area: 'Gandhipuram',
    coordinates: { lat: 11.0168, lng: 76.9558 },
    tags: ['Vegetarian', 'North Indian', 'Chinese', 'Dosa'],
    priceRange: 2,
    featured: false
  },
  {
    id: '8',
    name: 'Kongu Mess',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
    cuisine: 'South Indian',
    rating: 4.3,
    reviewCount: 980,
    deliveryTime: '30-40 min',
    deliveryFee: 30,
    minOrder: 200,
    isOpen: true,
    description: 'Authentic Kongu Nadu non-vegetarian cuisine. Famous for country chicken and mutton.',
    phone: '+91 422 2665 123',
    address: 'Peelamedu, Coimbatore, Tamil Nadu 641004',
    city: 'Coimbatore',
    area: 'Peelamedu',
    coordinates: { lat: 11.0168, lng: 76.9558 },
    tags: ['Non-Vegetarian', 'Kongu Cuisine', 'Mutton', 'Chicken'],
    priceRange: 2,
    featured: false
  },
  // Madurai Restaurants
  {
    id: '9',
    name: 'Kumar Mess',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    cuisine: 'South Indian',
    rating: 4.6,
    reviewCount: 2750,
    deliveryTime: '25-35 min',
    deliveryFee: 25,
    minOrder: 180,
    isOpen: true,
    discount: 10,
    description: 'Famous for mutton dishes and parottas. A Madurai legend since 1965.',
    phone: '+91 452 2345 678',
    address: 'SS Colony, Madurai, Tamil Nadu 625010',
    city: 'Madurai',
    area: 'SS Colony',
    coordinates: { lat: 9.9252, lng: 78.1198 },
    tags: ['Non-Vegetarian', 'Mutton', 'Parotta', 'Biryani'],
    priceRange: 2,
    featured: true
  },
  {
    id: '10',
    name: 'Meenakshi Bhavan',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    cuisine: 'South Indian',
    rating: 4.2,
    reviewCount: 1200,
    deliveryTime: '20-30 min',
    deliveryFee: 20,
    minOrder: 100,
    isOpen: true,
    description: 'Traditional vegetarian meals and tiffin items. Known for authentic taste.',
    phone: '+91 452 2534 890',
    address: 'Town Hall, Madurai, Tamil Nadu 625001',
    city: 'Madurai',
    area: 'Town Hall',
    coordinates: { lat: 9.9252, lng: 78.1198 },
    tags: ['Vegetarian', 'Meals', 'Tiffin', 'Sweets'],
    priceRange: 1,
    featured: false
  },
  // Salem Restaurants
  {
    id: '11',
    name: 'Selvam Restaurant',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    cuisine: 'Multi Cuisine',
    rating: 4.1,
    reviewCount: 850,
    deliveryTime: '30-40 min',
    deliveryFee: 25,
    minOrder: 200,
    isOpen: true,
    description: 'Multi-cuisine restaurant with grilled specialties and biryanis.',
    phone: '+91 427 2445 123',
    address: 'Junction, Salem, Tamil Nadu 636001',
    city: 'Salem',
    area: 'Junction',
    coordinates: { lat: 11.6643, lng: 78.1460 },
    tags: ['Non-Vegetarian', 'Biryani', 'Grill', 'Tandoor'],
    priceRange: 2,
    featured: false
  },
  {
    id: '12',
    name: 'Vasantha Bhavan',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    cuisine: 'South Indian',
    rating: 4.3,
    reviewCount: 1350,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 150,
    isOpen: true,
    discount: 15,
    description: 'Famous for sweets and vegetarian delicacies. Known for quality and taste.',
    phone: '+91 427 2334 567',
    address: 'Fairlands, Salem, Tamil Nadu 636016',
    city: 'Salem',
    area: 'Fairlands',
    coordinates: { lat: 11.6643, lng: 78.1460 },
    tags: ['Vegetarian', 'Sweets', 'Chat', 'Ice Cream'],
    priceRange: 2,
    featured: false
  },
  // Trichy Restaurants
  {
    id: '13',
    name: 'Sangeetha Veg Restaurant',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    cuisine: 'Multi Cuisine',
    rating: 4.4,
    reviewCount: 1680,
    deliveryTime: '20-30 min',
    deliveryFee: 25,
    minOrder: 160,
    isOpen: true,
    description: 'Multi-cuisine vegetarian restaurant chain with consistent quality.',
    phone: '+91 431 2414 789',
    address: 'Cantonment, Trichy, Tamil Nadu 620001',
    city: 'Trichy',
    area: 'Cantonment',
    coordinates: { lat: 10.7905, lng: 78.7047 },
    tags: ['Vegetarian', 'North Indian', 'Chinese', 'Desserts'],
    priceRange: 2,
    featured: false
  },
  {
    id: '14',
    name: 'Bhimas Paradise',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
    cuisine: 'Multi Cuisine',
    rating: 4.2,
    reviewCount: 1120,
    deliveryTime: '35-45 min',
    deliveryFee: 30,
    minOrder: 250,
    isOpen: true,
    description: 'Premium non-vegetarian restaurant with biryanis and kebabs.',
    phone: '+91 431 2765 432',
    address: 'Thillai Nagar, Trichy, Tamil Nadu 620018',
    city: 'Trichy',
    area: 'Thillai Nagar',
    coordinates: { lat: 10.7905, lng: 78.7047 },
    tags: ['Non-Vegetarian', 'Biryani', 'Kebab', 'Seafood'],
    priceRange: 3,
    featured: false
  },
  // Tirunelveli Restaurants
  {
    id: '15',
    name: 'Nellai Sodhi Kadai',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    cuisine: 'South Indian',
    rating: 4.5,
    reviewCount: 1890,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 120,
    isOpen: true,
    discount: 20,
    description: 'Famous for Tirunelveli halwa and traditional meals. A heritage restaurant.',
    phone: '+91 462 2334 567',
    address: 'Town, Tirunelveli, Tamil Nadu 627001',
    city: 'Tirunelveli',
    area: 'Town',
    coordinates: { lat: 8.7139, lng: 77.7567 },
    tags: ['Vegetarian', 'Traditional', 'Halwa', 'Meals'],
    priceRange: 1,
    featured: true
  },
  // North Indian Restaurants
  {
    id: '16',
    name: 'Punjabi Dhaba',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    cuisine: 'North Indian',
    rating: 4.3,
    reviewCount: 1250,
    deliveryTime: '30-40 min',
    deliveryFee: 35,
    minOrder: 200,
    isOpen: true,
    description: 'Authentic North Indian cuisine with rich curries, naan, and tandoori dishes.',
    phone: '+91 44 2345 6789',
    address: 'Velachery, Chennai, Tamil Nadu 600042',
    city: 'Chennai',
    area: 'Velachery',
    coordinates: { lat: 12.9756, lng: 80.2207 },
    tags: ['North Indian', 'Tandoori', 'Naan', 'Curry'],
    priceRange: 3,
    featured: false
  },
  {
    id: '17',
    name: 'Amritsar Kulcha Hub',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    cuisine: 'North Indian',
    rating: 4.4,
    reviewCount: 980,
    deliveryTime: '25-35 min',
    deliveryFee: 30,
    minOrder: 180,
    isOpen: true,
    description: 'Famous for Amritsari kulchas, paranthas, and authentic Punjabi flavors.',
    phone: '+91 422 2456 789',
    address: 'RS Puram, Coimbatore, Tamil Nadu 641002',
    city: 'Coimbatore',
    area: 'RS Puram',
    coordinates: { lat: 11.0041, lng: 76.9597 },
    tags: ['North Indian', 'Kulcha', 'Parantha', 'Punjabi'],
    priceRange: 2,
    featured: false
  },
  // Chinese Restaurants
  {
    id: '18',
    name: 'Golden Dragon',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
    cuisine: 'Chinese',
    rating: 4.2,
    reviewCount: 1450,
    deliveryTime: '30-40 min',
    deliveryFee: 40,
    minOrder: 220,
    isOpen: true,
    description: 'Indo-Chinese favorites including fried rice, noodles, and Manchurian dishes.',
    phone: '+91 44 2567 8901',
    address: 'Adyar, Chennai, Tamil Nadu 600020',
    city: 'Chennai',
    area: 'Adyar',
    coordinates: { lat: 13.0067, lng: 80.2206 },
    tags: ['Chinese', 'Fried Rice', 'Noodles', 'Manchurian'],
    priceRange: 3,
    featured: false
  },
  {
    id: '19',
    name: 'Mainland China',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    cuisine: 'Chinese',
    rating: 4.5,
    reviewCount: 2100,
    deliveryTime: '35-45 min',
    deliveryFee: 45,
    minOrder: 250,
    isOpen: true,
    description: 'Premium Chinese cuisine with authentic flavors and modern presentation.',
    phone: '+91 422 2678 901',
    address: 'Saibaba Colony, Coimbatore, Tamil Nadu 641011',
    city: 'Coimbatore',
    area: 'Saibaba Colony',
    coordinates: { lat: 11.0230, lng: 76.9350 },
    tags: ['Chinese', 'Premium', 'Authentic', 'Dim Sum'],
    priceRange: 4,
    featured: true
  },
  // Beverages Cafes
  {
    id: '20',
    name: 'Cafe Coffee Day',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    cuisine: 'Beverages',
    rating: 4.1,
    reviewCount: 890,
    deliveryTime: '15-25 min',
    deliveryFee: 20,
    minOrder: 100,
    isOpen: true,
    description: 'Fresh coffee, tea, smoothies, and light snacks. Perfect for your caffeine fix.',
    phone: '+91 44 2789 0123',
    address: 'Express Avenue, Chennai, Tamil Nadu 600002',
    city: 'Chennai',
    area: 'Express Avenue',
    coordinates: { lat: 13.0732, lng: 80.2609 },
    tags: ['Coffee', 'Tea', 'Smoothies', 'Snacks'],
    priceRange: 2,
    featured: false
  },
  {
    id: '21',
    name: 'Tea Trails',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    cuisine: 'Beverages',
    rating: 4.3,
    reviewCount: 650,
    deliveryTime: '20-30 min',
    deliveryFee: 25,
    minOrder: 120,
    isOpen: true,
    description: 'Specialty teas, fresh juices, milkshakes, and healthy beverages.',
    phone: '+91 422 2890 123',
    address: 'Brookefields Mall, Coimbatore, Tamil Nadu 641001',
    city: 'Coimbatore',
    area: 'Brookefields',
    coordinates: { lat: 11.0168, lng: 76.9558 },
    tags: ['Tea', 'Juice', 'Milkshakes', 'Healthy'],
    priceRange: 2,
    featured: false
  }*/
];

export const mockMenus = {
  '1': [ // Saravana Bhavan
    {
      category: 'Breakfast',
      items: [
        {
          id: 'sb1',
          name: 'Masala Dosa',
          description: 'Crispy rice crepe with spiced potato filling, served with sambar and chutneys',
          price: 120,
          image: 'https://images.unsplash.com/photo-1694159370168-f9d0d1e1a1c4?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'sb2',
          name: 'Idli Sambar',
          description: 'Steamed rice cakes served with lentil curry and coconut chutney',
          price: 80,
          image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'sb3',
          name: 'Rava Upma',
          description: 'Semolina cooked with vegetables and spices',
          price: 90,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'sb4',
          name: 'Pongal',
          description: 'Rice and lentil dish cooked with ghee and black pepper',
          price: 100,
          image: 'https://images.unsplash.com/photo-1574653853027-5d5c7b9c6b14?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'sb8',
          name: 'Mysore Masala Dosa',
          description: 'Crispy dosa with spicy red chutney and potato filling',
          price: 140,
          image: 'https://images.unsplash.com/photo-1694159370168-f9d0d1e1a1c4?w=200',
          isVegetarian: true,
          isSpicy: true,
        },
        {
          id: 'sb9',
          name: 'Rava Dosa',
          description: 'Thin crispy dosa made with semolina and rice flour',
          price: 130,
          image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
    {
      category: 'Meals',
      items: [
        {
          id: 'sb5',
          name: 'South Indian Meals',
          description: 'Traditional meals with rice, sambar, rasam, vegetables, and curd',
          price: 180,
          image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'sb6',
          name: 'Curd Rice',
          description: 'Rice mixed with yogurt, tempered with mustard seeds and curry leaves',
          price: 70,
          image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'sb10',
          name: 'Paneer Butter Masala',
          description: 'Creamy tomato-based curry with soft paneer cubes',
          price: 220,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
    {
      category: 'Beverages',
      items: [
        {
          id: 'sb7',
          name: 'Filter Coffee',
          description: 'Traditional South Indian coffee made with chicory',
          price: 40,
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
  ],
  '2': [ // Anjappar Chettinad Restaurant
    {
      category: 'Chettinad Specials',
      items: [
        {
          id: 'ac1',
          name: 'Chettinad Chicken',
          description: 'Spicy chicken curry with traditional Chettinad spices',
          price: 280,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'ac2',
          name: 'Mutton Chukka',
          description: 'Dry mutton preparation with aromatic spices',
          price: 350,
          image: 'https://images.unsplash.com/photo-1574653853027-5d5c7b9c6b14?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'ac3',
          name: 'Chettinad Fish Curry',
          description: 'Traditional fish curry with coconut and spices',
          price: 320,
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
      ],
    },
    {
      category: 'Biryani',
      items: [
        {
          id: 'ac4',
          name: 'Chicken Biryani',
          description: 'Fragrant basmati rice cooked with spiced chicken',
          price: 250,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200',
          isVegetarian: false,
          isSpicy: false,
        },
        {
          id: 'ac5',
          name: 'Mutton Biryani',
          description: 'Premium mutton biryani with aromatic spices',
          price: 320,
          image: 'https://media.istockphoto.com/id/1410130688/photo/mutton-biryani-served-in-a-golden-dish-isolated-on-dark-background-side-view-indian-food.jpg?s=1024x1024&w=is&k=20&c=ikpY4uMwkstungCvhwXoWV125bwnc4uvZT5FVaeOwb0=',
          isVegetarian: false,
          isSpicy: false,
        },
        {
          id: 'ac6',
          name: 'Veg Fried Rice',
          description: 'Aromatic fried rice with mixed vegetables and spices',
          price: 180,
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
  ],
  '3': [ // Murugan Idli Shop
    {
      category: 'Breakfast Specials',
      items: [
        {
          id: 'mi1',
          name: 'Soft Idli (4 pcs)',
          description: 'Famous soft and fluffy idlis served with sambar and chutney',
          price: 60,
          image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'mi2',
          name: 'Medu Vada (2 pcs)',
          description: 'Crispy lentil donuts served with sambar and chutney',
          price: 50,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'mi3',
          name: 'Podi Idli',
          description: 'Idlis tossed with spicy powder and ghee',
          price: 80,
          image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200',
          isVegetarian: true,
          isSpicy: true,
        },
      ],
    },
  ],
  '4': [ // Ponnusamy Hotel
    {
      category: 'Chettinad Non-Veg',
      items: [
        {
          id: 'ph1',
          name: 'Pepper Chicken',
          description: 'Spicy chicken cooked with black pepper and spices',
          price: 290,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'ph2',
          name: 'Crab Masala',
          description: 'Fresh crab cooked in traditional Chettinad masala',
          price: 450,
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'ph3',
          name: 'Prawn Fry',
          description: 'Crispy fried prawns with spices',
          price: 380,
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
      ],
    },
  ],
  '9': [ // Kumar Mess
    {
      category: 'Madurai Specials',
      items: [
        {
          id: 'km1',
          name: 'Mutton Kola Urundai',
          description: 'Spiced mutton balls - a Madurai specialty',
          price: 320,
          image: 'https://images.unsplash.com/photo-1574653853027-5d5c7b9c6b14?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'km2',
          name: 'Parotta with Chicken Curry',
          description: 'Flaky bread served with spicy chicken curry',
          price: 180,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'km3',
          name: 'Mutton Biryani',
          description: 'Madurai style mutton biryani with seeraga samba rice',
          price: 350,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200',
          isVegetarian: false,
          isSpicy: false,
        },
      ],
    },
  ],
  '15': [ // Nellai Sodhi Kadai
    {
      category: 'Tirunelveli Specials',
      items: [
        {
          id: 'ns1',
          name: 'Tirunelveli Halwa',
          description: 'Famous wheat halwa made with ghee and cashews',
          price: 150,
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'ns2',
          name: 'Nellai Sodhi',
          description: 'Traditional coconut curry with vegetables',
          price: 120,
          image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'ns3',
          name: 'Banana Leaf Meals',
          description: 'Traditional meals served on banana leaf',
          price: 200,
          image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
  ],
  '5': [ // Ratna Cafe
    {
      category: 'South Indian Breakfast',
      items: [
        {
          id: 'rc1',
          name: 'Rava Dosa',
          description: 'Crispy semolina crepe served with sambar and chutney',
          price: 110,
          image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'rc2',
          name: 'Set Dosa (3 pcs)',
          description: 'Small thick dosas served with sambar and chutney',
          price: 90,
          image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'rc3',
          name: 'Uttapam',
          description: 'Thick pancake with onions and tomatoes',
          price: 100,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
  ],
  '6': [ // Annapoorna Gowrishankar
    {
      category: 'Traditional Meals',
      items: [
        {
          id: 'ag1',
          name: 'Coimbatore Special Meals',
          description: 'Traditional South Indian meals with variety of curries',
          price: 160,
          image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'ag2',
          name: 'Ghee Roast',
          description: 'Crispy dosa roasted with ghee',
          price: 130,
          image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'ag3',
          name: 'Kongu Nadu Special',
          description: 'Regional specialty with local flavors',
          price: 180,
          image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
  ],
  '7': [ // Hari Bhavaani
    {
      category: 'Multi Cuisine',
      items: [
        {
          id: 'hb1',
          name: 'Paneer Butter Masala',
          description: 'Creamy paneer curry with rich tomato gravy',
          price: 220,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'hb2',
          name: 'Chicken Curry',
          description: 'Traditional chicken curry with spices',
          price: 250,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'hb3',
          name: 'Veg Fried Rice',
          description: 'Aromatic fried rice with mixed vegetables',
          price: 180,
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
  ],
  '8': [ // Kongu Mess
    {
      category: 'Kongu Specials',
      items: [
        {
          id: 'km1',
          name: 'Kongu Chicken',
          description: 'Traditional Kongu style chicken curry',
          price: 280,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'km2',
          name: 'Nattu Kozhi Curry',
          description: 'Country chicken curry with traditional spices',
          price: 320,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'km3',
          name: 'Mutton Kuzhambu',
          description: 'Spicy mutton curry Kongu style',
          price: 350,
          image: 'https://images.unsplash.com/photo-1574653853027-5d5c7b9c6b14?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
      ],
    },
  ],
  '10': [ // Meenakshi Bhavan
    {
      category: 'Madurai Delicacies',
      items: [
        {
          id: 'mb1',
          name: 'Jigarthanda',
          description: 'Famous Madurai cold drink with milk and ice cream',
          price: 80,
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'mb2',
          name: 'Madurai Parotta',
          description: 'Flaky layered bread with curry',
          price: 120,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'mb3',
          name: 'Kari Dosa',
          description: 'Dosa with spicy mutton curry',
          price: 180,
          image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
      ],
    },
  ],
  '11': [ // Selvam Restaurant
    {
      category: 'Salem Specials',
      items: [
        {
          id: 'sr1',
          name: 'Salem Chicken Biryani',
          description: 'Aromatic biryani with Salem style spices',
          price: 240,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200',
          isVegetarian: false,
          isSpicy: false,
        },
        {
          id: 'sr2',
          name: 'Mango Rice',
          description: 'Traditional rice dish with raw mango',
          price: 140,
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'sr3',
          name: 'Fish Curry',
          description: 'Fresh fish curry with coconut',
          price: 280,
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
      ],
    },
  ],
  '12': [ // Vasantha Bhavan
    {
      category: 'Traditional South Indian',
      items: [
        {
          id: 'vb1',
          name: 'Ghee Podi Idli',
          description: 'Idlis with spicy powder and ghee',
          price: 90,
          image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200',
          isVegetarian: true,
          isSpicy: true,
        },
        {
          id: 'vb2',
          name: 'Ven Pongal',
          description: 'Savory rice and lentil dish with pepper',
          price: 110,
          image: 'https://images.unsplash.com/photo-1574653853027-5d5c7b9c6b14?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'vb3',
          name: 'Coconut Rice',
          description: 'Rice mixed with fresh coconut and spices',
          price: 130,
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
  ],
  '13': [ // Sangeetha Veg Restaurant
    {
      category: 'Vegetarian Specials',
      items: [
        {
          id: 'sv1',
          name: 'Paneer Tikka',
          description: 'Grilled paneer with spices and herbs',
          price: 200,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'sv2',
          name: 'Veg Biryani',
          description: 'Fragrant rice with mixed vegetables',
          price: 180,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'sv3',
          name: 'Dal Tadka',
          description: 'Yellow lentils tempered with spices',
          price: 120,
          image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
  ],
  '14': [ // Bhimas Paradise
    {
      category: 'Multi Cuisine Delights',
      items: [
        {
          id: 'bp1',
          name: 'Chicken 65',
          description: 'Spicy fried chicken appetizer',
          price: 220,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
        {
          id: 'bp2',
          name: 'Mushroom Masala',
          description: 'Creamy mushroom curry with spices',
          price: 180,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'bp3',
          name: 'Prawn Curry',
          description: 'Fresh prawns in coconut curry',
          price: 320,
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
      ],
    },
  ],
  '16': [ // Punjabi Dhaba
    {
      category: 'North Indian Classics',
      items: [
        {
          id: 'pd1',
          name: 'Butter Chicken',
          description: 'Creamy tomato-based chicken curry',
          price: 280,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
          isVegetarian: false,
          isSpicy: false,
        },
        {
          id: 'pd2',
          name: 'Dal Makhani',
          description: 'Rich black lentil curry with butter',
          price: 180,
          image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'pd3',
          name: 'Naan',
          description: 'Soft leavened bread baked in tandoor',
          price: 60,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'pd4',
          name: 'Protein Bowl',
          description: 'Healthy bowl with grilled chicken, quinoa, and fresh vegetables',
          price: 320,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200',
          isVegetarian: false,
          isSpicy: false,
        },
      ],
    },
  ],
  '17': [ // Amritsar Kulcha Hub
    {
      category: 'Punjabi Specialties',
      items: [
        {
          id: 'ak1',
          name: 'Amritsari Kulcha',
          description: 'Stuffed bread with spiced potatoes',
          price: 120,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'ak2',
          name: 'Chole Bhature',
          description: 'Spicy chickpeas with fried bread',
          price: 150,
          image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
          isVegetarian: true,
          isSpicy: true,
        },
        {
          id: 'ak3',
          name: 'Lassi',
          description: 'Traditional yogurt-based drink',
          price: 80,
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
      ],
    },
  ],
  '18': [ // Golden Dragon
    {
      category: 'Chinese Favorites',
      items: [
        {
          id: 'gd1',
          name: 'Chicken Fried Rice',
          description: 'Wok-fried rice with chicken and vegetables',
          price: 200,
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200',
          isVegetarian: false,
          isSpicy: false,
        },
        {
          id: 'gd2',
          name: 'Veg Manchurian',
          description: 'Deep-fried vegetable balls in tangy sauce',
          price: 160,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'gd3',
          name: 'Chicken Chilli',
          description: 'Spicy chicken with bell peppers and onions',
          price: 240,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
          isVegetarian: false,
          isSpicy: true,
        },
      ],
    },
  ],
  '19': [ // Mainland China
    {
      category: 'Authentic Chinese',
      items: [
        {
          id: 'mc1',
          name: 'Hakka Noodles',
          description: 'Stir-fried noodles with vegetables',
          price: 180,
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'mc2',
          name: 'Sweet and Sour Pork',
          description: 'Crispy pork in sweet and tangy sauce',
          price: 280,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
          isVegetarian: false,
          isSpicy: false,
        },
        {
          id: 'mc3',
          name: 'Schezwan Fried Rice',
          description: 'Spicy fried rice with Schezwan sauce',
          price: 220,
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200',
          isVegetarian: true,
          isSpicy: true,
        },
      ],
    },
  ],
  '20': [ // Cafe Coffee Day
    {
      category: 'Beverages & Snacks',
      items: [
        {
          id: 'ccd1',
          name: 'Cappuccino',
          description: 'Rich coffee with steamed milk foam',
          price: 120,
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'ccd2',
          name: 'Chocolate Frappe',
          description: 'Iced chocolate drink with whipped cream',
          price: 150,
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'ccd3',
          name: 'Chicken Sandwich',
          description: 'Grilled chicken sandwich with vegetables',
          price: 180,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200',
          isVegetarian: false,
          isSpicy: false,
        },
      ],
    },
  ],
  '21': [ // Tea Trails
    {
      category: 'Tea & Light Bites',
      items: [
        {
          id: 'tt1',
          name: 'Masala Chai',
          description: 'Traditional spiced tea with milk',
          price: 40,
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'tt2',
          name: 'Green Tea',
          description: 'Healthy antioxidant-rich green tea',
          price: 60,
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200',
          isVegetarian: true,
          isSpicy: false,
        },
        {
          id: 'tt3',
          name: 'Samosa (2 pcs)',
          description: 'Crispy pastry filled with spiced potatoes',
          price: 50,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200',
          isVegetarian: true,
          isSpicy: true,
        },
      ],
    },
  ],
  // New Perundurai restaurant menus
  '1004': [
    {
      //category: 'Chef Specials',
      items: [
       
  /* ------------------ North Indian Dishes ------------------ */
  {
    "id": "N2001",
    "name": "Paneer Butter Masala",
    "image": "https://media.istockphoto.com/id/885881832/photo/butter-paneer-masala-traditional-indian-paneer-curry.jpg?s=612x612&w=0&k=20&c=iJkpQbnpoKYSPAx24u1HDm0OyXNLyQ0HzXgRfwaq-iQ=",
    "cuisine": "North Indian",
    "rating": 4.6,
    "price": 160,
    "isAvailable": true,
    "description": "Rich and creamy paneer curry cooked in buttery tomato gravy.",
    "tags": ["Paneer", "Curry", "Veg"]
  },
  {
    "id": "N2002",
    "name": "Chole Bhature",
    "image": "https://www.shutterstock.com/image-photo/chole-bhature-north-indian-food-600nw-2241211611.jpg",
    "cuisine": "North Indian",
    "rating": 4.5,
    "price": 120,
    "isAvailable": true,
    "description": "Fluffy bhature served with spicy and tangy chole.",
    "tags": ["Spicy", "Popular", "Veg"]
  },
  {
    "id": "N2003",
    "name": "Aloo Paratha",
    "image": "https://thumbs.dreamstime.com/b/aloo-paratha-indian-potato-stuffed-flatbread-butter-top-served-fresh-sweet-lassi-chutney-pickle-selective-focus-lassie-164213775.jpg",
    "cuisine": "North Indian",
    "rating": 4.3,
    "price": 80,
    "isAvailable": true,
    "description": "Stuffed flatbread filled with seasoned potatoes.",
    "tags": ["Breakfast", "Paratha", "Veg"]
  },
  {
    "id": "N2004",
    "name": "Rajma Chawal",
    "image": "https://thumbs.dreamstime.com/b/punjabi-cuisine-rajma-chawal-indian-vegetarian-meal-rajma-chawal-salad-top-view-114181130.jpg1",
    "cuisine": "North Indian",
    "rating": 4.4,
    "price": 110,
    "isAvailable": true,
    "description": "Classic comfort meal of rajma served with steamed rice.",
    "tags": ["Rice", "Veg", "Comfort Food"]
  },
  {
    "id": "N2005",
    "name": "Butter Naan",
    "image": "https://t3.ftcdn.net/jpg/08/95/50/04/360_F_895500474_IDUMxbOGEBn29tyPyjG8oLEEWlK8ZlOg.jpg",
    "cuisine": "North Indian",
    "rating": 4.5,
    "price": 35,
    "isAvailable": true,
    "description": "Soft naan brushed with fresh butter.",
    "tags": ["Bread", "Veg"]
  },
  {
    "id": "N2006",
    "name": "Dal Tadka",
    "image": "https://img.freepik.com/free-photo/indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-table_2829-18712.jpg?semt=ais_hybrid&w=740&q=80",
    "cuisine": "North Indian",
    "rating": 4.4,
    "price": 120,
    "isAvailable": true,
    "description": "Yellow lentils tempered with desi ghee and spices.",
    "tags": ["Dal", "Veg", "Healthy"]
  },
  {
    "id": "N2007",
    "name": "Kadhai Paneer",
    "image": "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/kadai-paneer-recipe.jpg1",
    "cuisine": "North Indian",
    "rating": 4.6,
    "price": 170,
    "isAvailable": true,
    "description": "Paneer cooked with capsicum, tomatoes and spices.",
    "tags": ["Paneer", "Spicy", "Veg"]
  },
  {
    "id": "N2008",
    "name": "Jeera Rice",
    "image": "https://www.funfoodfrolic.com/wp-content/uploads/2022/11/Jeera-Rice-2.jpg",
    "cuisine": "North Indian",
    "rating": 4.4,
    "price": 90,
    "isAvailable": true,
    "description": "Flavorful basmati rice tempered with cumin seeds.",
    "tags": ["Rice", "Veg"]
  },

  /* ------------------ Fast Food Items ------------------ */
  {
    "id": "F3001",
    "name": "Veg Burger",
    "image": "https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2015/01/burger-recipe.jpg?w=1200&ssl=1",
    "cuisine": "Fast Food",
    "rating": 4.2,
    "price": 90,
    "isAvailable": true,
    "description": "Soft burger bun stuffed with crispy veg patty and sauces.",
    "tags": ["Burger", "Snacks"]
  },
  {
    "id": "F3002",
    "name": "Cheese Sandwich",
    "image": "https://media.istockphoto.com/id/1308448446/photo/grilled-cheese-spinach-and-tomato-sandwich-on-concrete-background.jpg?s=612x612&w=0&k=20&c=fhwaJf0R8uTTOx2SnacxIbx0bakpRch4yNXuB6DVxZ4=",
    "cuisine": "Fast Food",
    "rating": 4.3,
    "price": 70,
    "isAvailable": true,
    "description": "Toasted sandwich filled with melted cheese.",
    "tags": ["Sandwich", "Cheese", "Snacks"]
  },
  {
    "id": "F3003",
    "name": "French Fries",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtA59R08z18Ze8VavH5GtXcHrKGYqdSJTkgQ&s",
    "cuisine": "Fast Food",
    "rating": 4.4,
    "price": 60,
    "isAvailable": true,
    "description": "Crispy golden potato fries.",
    "tags": ["Fries", "Snacks"]
  },
  {
    "id": "F3004",
    "name": "Margherita Pizza",
    "image": "https://media.gettyimages.com/id/184946701/photo/pizza.jpg?s=612x612&w=gi&k=20&c=4iMEO-I-_0tSb7f35CMFWN4N3Xdqf99sadSJyD-4dZk=",
    "cuisine": "Fast Food",
    "rating": 4.5,
    "price": 180,
    "isAvailable": true,
    "description": "Classic pizza topped with cheese and tomato.",
    "tags": ["Pizza", "Cheese"]
  },
  {
    "id": "F3005",
    "name": "Veg Roll",
    "image": "https://c.ndtvimg.com/2024-02/bbvgfbmg_kathi-rolls_625x300_12_February_24.jpg",
    "cuisine": "Fast Food",
    "rating": 4.2,
    "price": 70,
    "isAvailable": true,
    "description": "Stuffed roll filled with stir-fried vegetables.",
    "tags": ["Roll", "Snacks"]
  },
  {
    "id": "F3006",
    "name": "Spring Rolls",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "Fast Food",
    "rating": 4.3,
    "price": 80,
    "isAvailable": true,
    "description": "Crispy rolls filled with mixed veggies.",
    "tags": ["Snacks", "Crispy"]
  },
  {
    "id": "F3007",
    "name": "Garlic Bread",
    "image": "https://media.istockphoto.com/id/179044680/photo/garlic-herb-bread.jpg?s=612x612&w=0&k=20&c=kmVFvlwIpXTzDvMjnPa0Nu7X36GZRae0D0l9dY7Xsv8=",
    "cuisine": "Fast Food",
    "rating": 4.5,
    "price": 90,
    "isAvailable": true,
    "description": "Toasted bread topped with garlic and herbs.",
    "tags": ["Bread", "Snacks"]
  },

  /* ------------------ Chinese Dishes ------------------ */
  {
    "id": "C4001",
    "name": "Veg Noodles",
    "image": "https://www.whiskaffair.com/wp-content/uploads/2020/10/Veg-Hakka-Noodles-2-3.jpg",
    "cuisine": "Chinese",
    "rating": 4.3,
    "price": 110,
    "isAvailable": true,
    "description": "Stir-fried noodles tossed with vegetables.",
    "tags": ["Noodles", "Veg"]
  },
  {
    "id": "C4002",
    "name": "Schezwan Fried Rice",
    "image": "https://www.sharmispassions.com/wp-content/uploads/2014/11/SchezwanFriedRice5.jpg",
    "cuisine": "Chinese",
    "rating": 4.4,
    "price": 130,
    "isAvailable": true,
    "description": "Spicy fried rice with schezwan sauce.",
    "tags": ["Rice", "Spicy"]
  },
  {
    "id": "C4003",
    "name": "Gobi Manchurian",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "Chinese",
    "rating": 4.5,
    "price": 120,
    "isAvailable": true,
    "description": "Crispy cauliflower tossed in spicy manchurian sauce.",
    "tags": ["Starter", "Crispy", "Veg"]
  }
]


      
    },
    
  ],
  '1005': [
    {
      
      items: [
        { id: '1005_1', name: 'Chettinad Chicken Masala', description: 'Traditional Chettinad style chicken curry with roasted spices', price: 260, image: '/images/restaurants/1005/chettinadu_chicken_masala.jpg', isVegetarian: false, isSpicy: true },
        { id: '1005_2', name: "Kaadai Chinthamani / Kaadai Fry", description: 'Signature kaadai-style fried chicken with spices', price: 290, image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgvQIm82OQ0afPqrgz8mg7S1mUF528G38agaaiWGezhUuNaXWNrlRb0m6diQYO3E6XL4HafaRVDEZEkH19dEFDjG97B2BbnbXOyhicwBaSRQffmTDWmc6pu05VnmY0o5Y1noTdyGxbyCrw/s640/Kaadai+Fry+-+Bottom.JPG', isVegetarian: false, isSpicy: true },
        { id: '1005_3', name: "Nattu Kozhi Manjal Vengayam", description: 'Country chicken with turmeric and fried onions', price: 280, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPcoRHVKHPULRLW_CT2437GuH6j6WNrzU_Vw&s', isVegetarian: false, isSpicy: true },
        { id: '1005_4', name: 'Mushroom Masala', description: 'Creamy mushroom curry (also available as veg option)', price: 160, image: 'https://www.madhuseverydayindian.com/wp-content/uploads/2020/09/mushroom-curry-mushroom-masala.jpg', isVegetarian: true, isSpicy: false },
        {
           "id": "F3002",
    "name": "Cheese Sandwich",
    "image": "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/05/veg-cheese-sandwich-recipe.jpg",
    "cuisine": "Fast Food",
    "rating": 4.3,
    "price": 70,
    "isAvailable": true,
    "description": "Toasted sandwich filled with melted cheese.",
    "tags": ["Sandwich", "Cheese", "Snacks"]
  },
   {
    "id": "C4002",
    "name": "Schezwan Fried Rice",
    "image": "https://www.cookclickndevour.com/wp-content/uploads/2016/04/schezwan-fried-rice-recipe-1.jpg",
    "cuisine": "Chinese",
    "rating": 4.4,
    "price": 130,
    "isAvailable": true,
    "description": "Spicy fried rice with schezwan sauce.",
    "tags": ["Rice", "Spicy"]
  },
  {
    "id": "N2007",
    "name": "Kadhai Paneer",
    "image": "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/kadai-paneer-recipe.jpg",
    "cuisine": "North Indian",
    "rating": 4.6,
    "price": 170,
    "isAvailable": true,
    "description": "Paneer cooked with capsicum, tomatoes and spices.",
    "tags": ["Paneer", "Spicy", "Veg"]
  },
  {
    "id": "N2008",
    "name": "Jeera Rice",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "North Indian",
    "rating": 4.4,
    "price": 90,
    "isAvailable": true,
    "description": "Flavorful basmati rice tempered with cumin seeds.",
    "tags": ["Rice", "Veg"]
  },
  { id: '1006_p1', name: 'Chicken Biryani', description: 'Local favorite biryani', price: 160, image: 'https://www.shutterstock.com/image-photo/traditional-chicken-biryani-served-brass-600nw-2622739739.jpg', isVegetarian: false, isSpicy: false },
        { id: '1006_p2', name: 'Egg Parotta', description: 'Flaky parotta with egg', price: 80, image: 'https://cdn.uengage.io/uploads/7057/image-1684-1716214761.jpeg', isVegetarian: false, isSpicy: false },
      ]
    },
   
    
  ],
  '1006': [
    {
      
      items: [
        { id: '1006_p1', name: 'Chicken Biryani', description: 'Local favorite biryani', price: 160, image: 'https://www.shutterstock.com/image-photo/traditional-chicken-biryani-served-brass-600nw-2622739739.jpg', isVegetarian: false, isSpicy: false },
        { id: '1006_p2', name: 'Egg Parotta', description: 'Flaky parotta with egg', price: 80, image: 'https://cdn.uengage.io/uploads/7057/image-1684-1716214761.jpeg', isVegetarian: false, isSpicy: false },
        { id: '1006_p3', name: 'Chicken 65', description: 'Spicy fried chicken appetizer', price: 140, image: 'https://i.ytimg.com/vi/afaP90FH-MA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAAcnerG5SplvZMH6b2FMzdikDweA', isVegetarian: false, isSpicy: true },
        { id: '1006_p4', name: 'Veg Kurma', description: 'Mixed vegetable kurma', price: 120, image: 'data:image/jpeg;base64,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', isVegetarian: true, isSpicy: false },
        {
    "id": "C4003",
    "name": "Gobi Manchurian",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "Chinese",
    "rating": 4.5,
    "price": 120,
    "isAvailable": true,
    "description": "Crispy cauliflower tossed in spicy manchurian sauce.",
    "tags": ["Starter", "Crispy", "Veg"]
  },
  {
    "id": "F3006",
    "name": "Spring Rolls",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "Fast Food",
    "rating": 4.3,
    "price": 80,
    "isAvailable": true,
    "description": "Crispy rolls filled with mixed veggies.",
    "tags": ["Snacks", "Crispy"]
  },
  {
    "id": "N2007",
    "name": "Kadhai Paneer",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAMEBgcCAf/EADwQAAIBAwIDBgMGBQQCAwEAAAECAwAEEQUhEjFBBhMiUWGBFHGhMkKRscHRI1JicvAHFTPhJLJTgsJD/8QAGQEAAgMBAAAAAAAAAAAAAAAAAgMAAQQF/8QAKREAAgIBBAEDAwUBAAAAAAAAAQIAEQMEEiExQQUiURNhkTJCcYGxFP/aAAwDAQACEQMRAD8Ay0zd1jFeLerM4V9idqHT3LMcDl0rm1jeaZQMgkjlzNaC/iKC+YdIYbAMc+a4BPpSllitmEXD8RduQkcAOACf5v2/Ko15fizBjg3udw0nPu/7T/N69OlTf9PtMOo68LpwTDajvWLb5foP19qWXjAs1C0hFlp1rbHh440AYxjA4upA6b5NRbmcwjJHXoa71GYqG6Hblv60EuLqV0OcDpjIPH6YrKSSZqAAEburrxZCkY8hRDStY/gvDPI7Rn/+Yxkeucig11G0amS5eKzQ82mfh/Acz7ULOp6TG5IuJrgnO6RFB+LYP0qtnmXulwnttJu2eQ2xjc5xliEz7HYVXZmsLeaSK504pKOaic49D8qhN2ltI17tLadlxj/kx+ma5l1+xvsG4sZsoMK3e5JHvRBYNxyW5LQmK2ijghOzCMnLf3E7kelO203E3ifhyd+IZBPtQ83mjzbCW6tj04ow6/SpOk6G+qX8UcepQLbnJM6ycvQDY8X0qbTJuqMapYXmu6hDZ6UyT8CFyqAqqdMkn9au/ZnsrZ9mkF7cOtzqRU4bG0eei5/Ojlnbab2f0tba2QxtzaRt2dvNj1qu3t4bmUM7MmDlQOtXdCoIFm4Ru9aKu5hjA8+XPn+tQmu7XUlMF/EZE34ZDsyE7bUIvdStIUCtIFbPi2pi01G2kkHBclXBwGPT8Kio12JCy1RkPV9Ok0+bu2WRo3OYpCMcQ+XnQ5yeYJ/aj2tXmpvF8PeSM1tkGI5DAn+6q2uo2yTcDRGY5xvyrUDQ90znk8RwO2NnOKVTo59IdcyBom6qCaVFxKlOjhycmiUo/wBsiCna8kXOP/hU/wD6O3yFO2qR26G7kXjWP7CkbO/QfLqflQuaV55WklctI5LM534ieZpJ44hrzzGm4nOOZJ5Dcmth7KaP/smiQRYzcTeOXHVj09hVM/0/7OrqF6NQvfDaQNleLlI37Cr1rGvW+nxyFSCi8wfPyx55oD9owDzOL+4hSJ5L2RURcZdvLoN/baqhc9oZbq6aPSlaBeA8dyTlgvU77KKEarql3rF0zTHEZPgUbf586KaNpxlsbkOqYQpsy/aBB9qVkcILj8eIvATwyX12AryTuxGXd9vdjsB9Kfms7i0m+HkTujjIIXORy5mj9japLOttFxBm2XhjLcR+Q96s2m6FbamUaV1nSHhVHRuR65/D6nyrI+qCWWHE3powO5W9G/0/1PV7E3CypGTuiSEjiHQ0L1vstq2iSlLu3l7sHwzKhKmtuSaCxQrbK/hChM4Akb9h+tRzcLdXXd3aQ9yU4XDb+Lfbeuanq2QNbgVIdKDyJgjI4UnKuM4OdvrTcbNBMJI2eJhyIJH1rT9b7NWE2ox3EcEjhsr3KuVUEfzn7R28vLnVe1Xs1HHHlLd4JM7ZLcJHqGJ/EH2NdZNZiZQw4uC2iY/pEH2Ham4Mfw2ou0kfIO24Ht/ntU65ucRcSSBoyMqV/eqrJBwOylSOE4Kk/lTi3ncxmLjLREEcOd1z1FabuYGQrPdOjOpXjNMWZFHEwBO/lVottH05hg26A9OHYkf3UL7N2cSRXEi3C8HhAb7wHX3FS7yWaaMiE44Niy5GfnUNg8QFFiTDNFp0otbh/iLCTYk7tEccj60EvdIXStSzFJ3ttKnFby+Y8vmKcsbR7rvI5WLA/a48H38/en7SR1jl0m9zxpvESOXqPQ0/G27gxLrXIkDgDcwv4Uq9wUJVxuKVNqBBmqvwmO1XlDksfN2xn8MAe1M6VYvqWoRWseRxnxEdF6n8KYlZmZmY8RJJLHmSTmrn/p5pnxCX1xnDZ7sN1A5nHzJ+grOfmNX4hO4v5bNIrCxAW3VOEADlgcz+Jqs6pO2oMGyTEpxGg3yfOp/aLFmz2iN/EkPCzeS8/rTXZmzbUNetLeILwL58ttzSMrbFLfE1YEDtUn6J2G1S9MEnCscMnMk4ZRg9D64HvVmi7ML2dQ3BuZJ4HwtxEwBZOvEAMcs8sct/SrTGYYZFdzl4oSO7BG433BO9C1ISSSC3W3d5lD93LhTxHIwp9q4o1uTMaPU62LThTcjR2+lpLFco8LxDDd5EwLuBnAKe/l0pjWobyz08zaLcRWnfuXZWIJKAYA39S1RJbxdNuppJ7Hu51XBWQEcI6/PbNCLzUoLgwBJDIsUIBZjnLFizf+30poZr3MLlawnCg2ybo/auRu6h1SWG0ePwpJMCwO3MDA/OrvbXMUlpLJFNHdyfeEPQDlgZOx5VncOkzak6mK2BQnDs6A8I8+E88USjkfs0zzWUsQlQ8MiO4BkVcjHD5HnmkvhxPW3gxODLlycN4kyXtMulasJYo83QTLQhOHLY5kmpqJqurzobn4Qif7IM/E2fLYc+dVy3sotVk+JaCYOWLQM2AFB34HPnv8qf0m8OmvJ8RDNC6nDBYgdjg5JPyG9G6t9PYs6O7abAr7wnq/8Ap/BbR3F9eXqKg5rEvI8uv+cqy28gU3DO0TCPiwVTb/DtWla7fXOo6WkVs08hkAZQ0myjIxj2NCJOz08FqpltoWQjx+LfNP0eXIFt5ly4TlWmPMpul3K2d+Y2figL4O/51foLWF41AJw6+EiqNq1hHZSLNGVNtN9nh5qfX8KsXZi5aa1aBpfEm4yK6gYOticZ8Zxttad6jaPptws8MHeoT4olXJbHl5HFRO0ircCPUbAvIsIHeNw47sHox6mrZLmWMK5PEB051XprXAuYlEXdujc3Ibl0xnI9CBUBIMAi4I4mlw4UsSNz60qG2ty6wgF+HHSlWrdEUYMcHoMmtO7CQLp+hidhlX4pD8qzfgLNgc+lafl7Ps40SFQiRqNuYFJMNZR9TmNxql1cu2eFiAT1Od/qTRzspYzW1xHeSQ3QV4yYjGuC+dhgkjHnmq2qtJAiD7UkhOfOtG7JR3AisnjuI5ZBC0SiRwAFXkAMc/esOsb21OroVq2hDTNc02ORba9kjS6HhQyE5B54LHYjON6B61E63Rht5I7kNIWUW+Ww3Uct/aiOp9mjqEqz39pbWbM5zwyjx+oycAdeVG+zWgx2KxveSvMqH/x+72CJnfPnv51ySqYfeO5vGWufEqV1quoadCllrEEd1bHDJDegEgdeFtyvy6elR9E0ax1CSa4gDJENo45C7cJ6FcDLcsfnWp6hp9pcxxxXcEctsRw90yg59c8xyqpafeab2a7SwRWjOlvdS91LGzeEEbhhnkOn4UePVDKpHmCGVwSF5jlr2a1ueGV40eTjBaJ5bgBo2OPtcPTnsNqlW40a6D22vwW8d/H/AMneIviP8y55j960KO6jWPIZY0Ybs+2Kz7t5Zabq9xDJp17G2oW8oJTmrxEjiHzHMe/nR+3hlMz487ZWKkV/E87vTnuBYaFBEyQMO9LDCJ0wD1Y0N7R6aJmga8jiiZSDH/DXHyx1Hoa8tbprHVGvbQIba5ZnlUNts3Pnz3PLyNc6hPYXEhm1DV3ilkLeHueMKB5gHIO30q+Dyp90y6k6gPQPth/svo1pcgPN3SlQGKK2ATj05eoo/FbWUZEYjiIk3YcgNulUvSLWwtGF2dRnvFVFYSJFyGf7/wAxVse3F3brc21xJErrxIGiyPz/ADoDlOOlofmaXG7lia/iZp/qTaWcGr8GmwAsEDzRcOYyxO3h5Z55qm6bdi2v5pI0MSZPhH3cdN/etnk0qbToprqZxNGR3jYBIz0ON+o3rKdelMnaQzNEiPMEZlQAAHdDt/8AU10NJqN5itXjBTcDcN2Wr2ksQaRww6Ov69aDaxqCKJVhIbj5FTjHvXS6FaSKptppbYuocIh4gw5cj7j5ih2p6bp9ikhn1SSSYA8MKR4PyIO49638Gc0kiBGKxeHvCPTHKlUQ8R3IJJ/qNKiuLk+LeVa0fWyI+zzeE54wOfIb1nUCcdyicsnFalr8AHZibiGWBQ5x0yKE9wx1KAH+Haxk5kLkbdelX6z022isYbm3Ui6tgXdxnx5Hi5b+dZzIzizs58E8J59MgirXbaxBeskUXG87L4e78OD+vM/jWHVg+J1tG1pUtM/aYJHCl4lrLADgwBMvg58S78+vl511P2pl0lBdwQpfaLxAma1JDR/3r93Hrj3oD/tjaLPBqF3YzzQOqlO68Bj4sgrvz6e5pXazOXvInhti5/4Y2KyBQeTgbZ+VZFXGwp+pNRkXF5/qW2TXrG+sUk0u7S5luXxGqMcxZ55HMbflWca4JRezIhM/wzCVgoJMYBGT9KciheCWWW38NznMYHhU+hxRLSu/vbXv7x4iiZjuISjcQVsZycbbb450vHjXExZeRH4MgyY+IY+Oa7aFLh5McKgI7HgFQb2QRzzXksjxlRwKAQrNvXa2/dPHbpc26xjwxyM7bfy5OMD5/lTum9n7G+jeW6vlvGi8JSGUrHnrxP1Py86UmHneSAI4lVgyfQ9RMggXTP4oDSiWJvAiMc7sNgNutBr+Sa7MkFnCJXiXEkqHiUeeCOfzq8nRNYmM9vex2wssbWdu7hT/AFMcZb38+VMSaaujmWICREuoCDwQ8Makct87k09siL+nkxYxLkYFpF7K6haxabL8QWSRgAVwOJyOYXHTOOdQtQ1wJNiGVhMNvt4wo+VP2tlp91a+AcFwrkMARhByy3X12orb9ipJoBcLdW0kUY4SQ5JH050sYVfIW7+00NtXgmoNF1eavp06f70xC8uFsBgN8Y5is/d3mvwXbiwyqMHPX9zWm6npz2en8dtiJHUscphnQcxt5jkazWFreS/44ePg7zjPEQTtueQ9K36JQGIqYNcKQAHuTW1a+itu6QjgU8QYjdM88H18qrd8HMnHKxZn5k1Ziv8AC38qBamqhlx0rpEVOLchpsu1KkK9qpUtmn6f8NawXRh766lbMCgZx5YFP33aTVrBbix1KKQd5GRwTAfiDVgso8Xei4GVW2Y4x1orrun2GqaeY7uFZUx4DnBB9D0+n6UTkA1LUWLmZpFLcQPb26d4qcU4PLEYGfoDyrQOw+hLFaQ3TxKbmVgEONwOuDjbciqVIkmmccVvMG7tSqOw2ZD0P5e1X/s5qa2nZ/T7yW9UiS2Um3ABLyAYyT0A6j9q5XqVjGK8zqaF6BHmWbtBFeQ6eF75mHd4D94FOdxnPoPKs4s/480iT3VlbNG3A0l3crGM++59hRy67X3CmY3PcMjsqxx8R4Ys7faxn5/M7VDv++uLX42FbNwWV5o2ALoARg8I3YDpXPwrQpxxHPpRmABNGTtJ7P8ADMZTqWl3DqOOJozLIVxvn7IHvVw0KHumKfCv8O6jHEADI2cMSOe23sazo6zNpM8dyY3Sd3DJKUwrxDG2/rkkf9VfezvaKDXwtw8ka3MLEmMA8SjHTzFXnLAWBxJ9L6SbBPLnQbc3R+EijZH8fw/CnHC3Msnr6cj9aDw6SAk0V3cswnYSJKnhWUEnbh+7jkR0qzdo9XsNGsRqmVlueLgt14cEnGw88VnttqkmjRse0ckvdX2ZUE8Z8DH7y7Ejnv7dam05MZHmHhdu/wDZddQZg6PEWkaIH7YJySeQ6HH7Vx2xmW30tZTI6FRxPwnpjkw/SolhrtpexRXEd7bm1gAVzxgEHbGc8uVRu1l6NYsroWjxmBk4OMgNk/0+e2dxtsaw4sbb6I8iNA9wgvXuzl28Ed3pxEQMfCOE+JwefiHQ+RoTpsusW8RhFtclUAJdbkojHfmD7VEh13VLW0gudSt75o1ZVDFvB124c+ldHtRcXd0OK3cQFuIKz4AO23lXX2sBVQw7A9zzW7jWW0e9vdTvWCoBBFGrYUnPTHQcsVV9KhK8UjLjIxy8/wDoGpvaC8vr3UIra6iEUMPiWBDgCnSBEEQ/cG49T09hj611dOgVLnG1mUl6+JwzAYDUD1MhpcDnRmY+E9MVX5iZJWammYh1GwNqVdAGlVyTUNAuUmtNNlBVnEcluB/UcED34ak6heM1z3QbwqpGRsGbr7DO58yPlVL7J6hJHHLZhiGU8cZz5c/xG1GrjtRY6x/4vw7Wl0zcBUnKnffB/f8AaplF8yIfEDapIO+EuPCxPT7v+b1FtLO8N0xtZ3xHGZAinIfz4R7k/jRjUouLhYLsykrt04gP+6FGSOzmRJCVidtmP3G5jfy/KgADDa0buKmxDHZWG21KeaW7jaUxsMK7YANWK4srKO/i1K1WSKDhPeBmMakjkBjck8vlk+VVKGObS5JLy24pI5GHexHfHrmisnaGPWbmI6t8Xb2yAYEUZdfLbHLODXO1OB1al6nX0uZH5cyRrqWlzZwzJLHxkcJiHEpzyJ3Jz5ZoXoFtqfxqjSULXSfdQZJ25tnYDHU07cWgYNJZXrz2+DwtNEycPpk7Zov2alm07Ti8SBpnJ72MvtKPL1A22z+dIc7EpuZrcBx7Yca/zdw3WtPbSXkKqIMIDHCDsSi/eY+fLlsRUe6t5mmkL9pIpVkUcUWoQJKreexHL5Yove6QNVtGaAd5G6qyoYw3zLE75+WKpN5o0DzyQvITwZX7WQuDyHlypQz+VahMWZlxLZFx2aPsiLxYZIHk4smZbF2WLO3JWOc8+R2q6Pf6dY2FsO4S7hUARxkGA4G2+SQxGOWKyy30+502+WRYcRmQ8DuccWwJHrsavNxeW9vpEavPaJ3DFgszHAc9BjqN6mo3blo3HYwHUN8yVriaT2oAEmrPZIoBWG6h4BxYyPFyx+FV/WbKLstFbtfYuY5DxQmHHBJj+rJ645b0RnmcW41PVrmLgaQLbQSDhLjcDf7uf28qF3ccckg1G8VLe3jYjuiM8J81x9onG3p65rTp8f1DtriVl1H/ADrwf6gGVhNJLqFxDwyzMMJnOTjYenmajuxY8ROSdyfWnru5M1wZSojjG0aD7o/eoszqqF+ldhUCihOC7lzZkG/kdRgHnUBE/OvbiTv5eJtgKet4+9YJkDPMnoOpoZUetra2MKvdNIjPuoUfd5Z+hpUxcyrLKWUNwYwg/lUbAfOlR7ZVmSLA8NtcXCD+NbyK6+oP2h+tN65B3rDUbfAV8cfD90+f+eldtewW9nJHEN3JJ3pmznaKMNnvYG2ZcZx7UTC4I4hnSdba+sxZXLhplXHLBZfL1ztU1tNS41SCzuIw6cJdv1+ufwqstp6yMsthcrG2chScY+Rqw2981onf3kySXRAXwHyGAPWlhPdzDLcTi1uDps72sheW3RiqHPiQdPmPT8PKj1gUu1DRyFhuQUbbI6eh28s1WcOwaR9nZsnHQnpXFvM8D95FJJE6gjjU+245EfOgYq9q4sRiFkplPMu0cFjFO4njnbiPFhpThDnO3TpvXMMc1hqOO6a7VmMxSJjwqDz3HI/pQW37Rywn/wA6ITIRu8WFPuDt+VS/930V1KQ3bWkzfeMbRFfTiUY+tY30AJtH/M6KepECsi/iTe0faS9Fg8HZ4XlmqnE7SkA56cODk9c5A6c6iaXd2cVkiJYFQsYjxNJjhk++xIGSeW1RXh0ifPf6rGQWyVW8Iz8/Ou1PZ62RWOoxlk+yUkeX/wBTmrX06kAFRD6rGwIruFLm0M2nQQREy3IyzRgsctkZAAGBzFCrLQbn4ia4uofhsHEcSnjkUk55csepI+R5VPh7d29ipS1innBHVRGM+fn+tBdR7VapfBljkW1jbpF9rHlx8/wxTsOjRL3m5H9QybQuMUBDN7c22ixPLdXD3l868Hw/EDgeoAwv6/SgV7JJd3qm6uoymA0ZAIRUK7EeZ+X/AFQqArG5LwiXP87bH1PU1PnnaewgmueFHR2iQqoVSgwRgDyJIp449qihMTMzG2NwhpjWM2oW9kIGkE5aMzTHBHhJBVRsNwOpqr3kzHKYx51N0qfj1/SzGdhdx5A/uxTF9Dm+nAxwiRh+Bq4MgInU1IlPw0PdD/kkA4v6V6D3/SupMWsSu44nb/iTr8z6VD3bLMSWO5PU0QElzoDalXucV5RQbg0Lxsa9SWSBsoxFORr4tudK4j60JU1YkuzJMEqTLlfA/ULyNeTRylfGc+tQ4jwsGG1FFBePiXBxvjzqwu6S9sag1K6gARv4igkgNz3ool3ay2ZxKEdjkqdiOpoZwLKxCHDdYz9ofvTE6ni3BOKVtjN0fTUS07uwBVjyArqOdWYljz6k0PbIx0rjiI61KkuGHdeEFeHNOxR98QE4eM/doIHYDma6V3HJj+NQyXDDMEkMb7MuxU7EGuRcKux50xDeCdVgvyxTGFmGOOP9x6U0IyFyDkZ6DH0qxcomTTcrjGM70/fXou5F4UKxIoWOP+Ufv1J8zUKCLjXyBqXDasMs2FRObtso+Zo4M9sS9teQXMYHFFIHUEZGQc11dSx2gEk2HmPiEeeXq3l8qZuNSjhzHYeJ+szDl/aP1obxM58b5Y7niHM1JcclleeaSV2LM3U/pXScuVIKeLAAJ6cNdYJb157UUGI79DSpfM4+ZpVdS4zEopTAHHzpUqMxQkKQcLbVItJ3HI0qVK/dGHqO344VV12bnkV1p9w886QThXVupG4969pVG7lr1HNRto7edkTJAxjiqHPEqhSOZpUqXCnAQV2qKTSpUUqSYYk51NMSooIGc+de0qISGStRC6fp6TworuwB/iDIHtQC5uJbiUGZy2ACB0HyFeUqE9ShEBvjJxTibDHSlSol6lHuOBjjHTyrtRkMT05UqVFIJ0NxnJHypUqVVLn/2Q==",
    "cuisine": "North Indian",
    "rating": 4.6,
    "price": 170,
    "isAvailable": true,
    "description": "Paneer cooked with capsicum, tomatoes and spices.",
    "tags": ["Paneer", "Spicy", "Veg"]
  },
  {
    "id": "N2008",
    "name": "Jeera Rice",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "North Indian",
    "rating": 4.4,
    "price": 90,
    "isAvailable": true,
    "description": "Flavorful basmati rice tempered with cumin seeds.",
    "tags": ["Rice", "Veg"]
  },
   { "id": "1007_2", "name": "Parotta with Mutton Curry", "image": "https://www.shutterstock.com/image-photo/whole-wheat-paratha-spicy-mutton-260nw-505610596.jpg", "cuisine": "Dhaba", "rating": 4.4, "price": 170, "isAvailable": true, "description": "Soft layered parotta served with spicy mutton curry.", "tags": ["Parotta", "Non-Veg"] },
        { "id": "1007_3", "name": "Parotta with Chicken Curry", "image": "https://www.shutterstock.com/image-photo/whole-wheat-paratha-spicy-mutton-260nw-505610596.jpg", "cuisine": "Dhaba", "rating": 4.3, "price": 150, "isAvailable": true, "description": "Flaky parotta paired with classic chicken gravy.", "tags": ["Parotta", "Popular"] },

      ]
    },
    
  ],
  '1007': [
    { category: 'Popular Items', items: [ { id: '1007_p1', name: 'Parotta with Chicken Curry', description: 'Flaky parotta with spicy chicken', price: 150, image: 'https://www.shutterstock.com/image-photo/whole-wheat-paratha-spicy-mutton-260nw-505610596.jpg', isVegetarian: false, isSpicy: true }, { id: '1007_p2', name: 'Chicken Sukka', description: 'Dry chicken fry', price: 180, image: '/images/restaurants/1007.svg', isVegetarian: false, isSpicy: true } ] },
    { category: 'Dhaba Plates', items: [ { id: '1007_1', name: 'Dhaba Thali', description: 'Hearty thali with 2 curries', price: 110, image: 'data:image/jpeg;base64,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', isVegetarian: false, isSpicy: true } ,
      { "id": "D_008", "name": "Curd Rice", "price": 50, "image": "data:image/jpeg;base64,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", "isVegetarian": true, "isSpicy": false },
  { "id": "D_009", "name": "Tomato Rice", "price": 70, "image": "data:image/jpeg;base64,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", "isVegetarian": true, "isSpicy": true },
  { "id": "D_010", "name": "Lemon Rice", "price": 60, "image": "data:image/jpeg;base64,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", "isVegetarian": true, "isSpicy": false },
  { "id": "D_011", "name": "Tamarind Rice", "price": 70, "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAwwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAECB//EADsQAAIBAwMCBQIFAgUDBAMAAAECAwAEEQUSITFBBhMiUWFxgRQjMkKRFaFSscHR8Adi8TNyguEWNEP/xAAZAQADAQEBAAAAAAAAAAAAAAACAwQBAAX/xAAnEQACAgICAgICAgMBAAAAAAAAAQIRAyESMQRBIlETYTKRFHHBI//aAAwDAQACEQMRAD8A840HRd0gu7g4gTrnvRTWtVe62QxMRAgwq1Hql2qKlpbHESdcdzQolm+tQyfJ2y+MVFGvMJOCaxh7V0qV2UArrCorFfepbe3Ep45rtYizYxROysHJLKfT7islKkcokKW+MADIxRKysSMts4A61ftdO3gnBI7Uw2enqLdVYYz7VJPK/Q1IV0sDKw3pkVet9Pw//p8dqaYrIEFVUYHGcVPDppKs230qOe1JlkSVyZtNi8loAOUqUWEhKgJw3Timi20y2kCkynfjlQeponPBAluFK4KjhuhFTS8mK6NUGId/p0lpCWkQrkZ6UDuL2381YNpLn2FemXFna3saRuGkUDlt2cig8mkeHbG8OICZQpkZt2Qo6V2Pye7Qf44oVJNAu5Y1l8shWGRxVSbRZF9Lpz9KcU8RyWl4be5RWj6RkAcjtRy3ube7RHdImJ5VTit/y5LbRrxfR5JdaW6KGMeBnrihUti24+g9favbJDYXrrFcJCE3cJxnNQSWunTLIFtYlSH9WV5+tMj59AvFbPDri0MRwwINV2i+K9X1Xw9HqWLm0MZQDA2jlvtSzrfh1NMhBuHBncZVVHarcXmRn/snngoS2jKDpXKrxmrzwEgj/OovKOOlWKViOBCI81p129OlSD9RHtWjzmus2iDFbrrFZRWDQRZec96zGKkkUoSO44rlBk80iyqjAcAkitKCxwOc1K0e5cLRDSdPlmkCqKGUklZ1FvRtGMrgzcqacLLSI0QKFwo+K40bTPLiUNkNnODTNbWZ2bsHGcZqHJlvtjFEH2umxJ6sZq5HZMxPlr05weKvHZax/qUOOuahn1G8UhIrCaVyu5cEKh+Nx7/FSPyLdJB8NGrW1aGV2kiIZgMgnIH2oksiSkKF3FeDxxVW4vnihBaHdMMbol5bBNDb/wDHyQtcwTzW5TkweXwcdeR/nU7bk+w0tF25t4gWNoF8/oV3YAFA9Ou4vPa01O6kS5Vjgh/Swz0+elBb3WrsLb3s0TqjIVdt4Xaw6j3zzWp7KS/dNXhU4YncNuMcf5d80xYtfIZSSC7yDT/xNmpRkb8yLzCRtIOR8mhPiu6tFWYW0sa3TorSEsAe2RijWmy2WpxyR31kRNZqASD6WyOGHekDVTJp2rtqMtuu1uYi6h8f9wJ7/HtT8GNSnT7QuTaLDanGJlk1CdbiGCLK2yj9R7c96j03XrwzeTaQmPcw8vMmQOvFVNLkTVdethcNaJOZdx8wbVcgggD2Jr0/UfBmn3d+NQtJmhZ0UYUDBb/F/FVZvx41U1sBtqQtRay1rcI+oQxm4Y5yh3AL34o3cvNdzO1lMsibAy57A9RihWvWp0dUjnUSyiIBZmTAbJ5wffihoS6uSl1CXjhMZUyg4BqJ44y2jJ5nFjdbWl3HBEtnGI/MyHk6qDjrig2p6MYozLd3MlxM3T0naPvTLoxuH0u3E+I1CjBZvUw9wKI21vL6lujG6SnIQ/t+KTHI4S0G2pKzyC80wMrnZjHQ+9Qx6fEYAAQWxXoeraBKC7Ig8sZ5LCl6WxWOPKgA/SvThntE7QlXGn7ZXGOmKGyxMhPBNOP4X8+Us/HFCp7fKswXpnj3qqGawHjF/wAtj2rKusnqPFap/ID8ZLJ813Em4g4+1bKg9at2cQMqD5pDlSHpFvSbA3EgaQAITTTptgbefbDyM5JI4rdusCIpVFIxjgUStlEnpx6W4qHNkbCQbgW2s7ctLtGxN5kdgPtV0BfJSQsoB9T5HGPjnilf+lyafeMslvE0MoyJJTvIYdjnoPirkmpvqC3xs7jyZ4HWISnlSSM4AqGcW/Y1LQcNvb3CLIojcj1Ix9Qz7j+aq6r5ht0eHe8oYKQkmABnk5+KUrLSNSudQuLi+k2aY6uYTDLsPLDAI9vem3TogunLbJL5smCu8AensCcVkoKDW7O/YK0vUJLqSeKWRTOp8uM5ySv+I/PFELLashtxePM4bJYgDjHSlyKOS38Qvps8wE0q+XHPtGS2MqcZ9+K60sT6fre28ga9v43IEwQDZuHBo5Yk92bGdova3okVzbzGWVYbaIF5CqgNk9P75NDZJJ9Ogh3rJdxywZZYxnfnpt7k9DWv+oOqR2F1a2j4QykySfvXrjv0HyOaVjKV1RRbTxQyPGNpD+WjDHOCTwc9D/uaqwePOeNNs1NP2HNMtb7TNHS6eKaznuZgQZF4VOoHXPTt71X1zUI57+zt7kwOytv88OXi5XPpUAkNxjHIz70MPiPVLqybTpLjzrZjk8FmBHPBPft/NM/hPwxLeQx6hqOI0HKJHj1rjncRyOnTvTKjifOfY+4QjvsXra11bxXEU062S3thMGkllI3bhjGCAMfamfUZtT0l9+o6ibW1ikDQlofMEgychtpGD0wfnpTNdWvl6fJHYP8AhpAu1JBHgJ8jHSpooBjy7meRyU2ssjkhvf8A5ipZ+Yp9rRO3bsBaZfR+KLERDyW6ieKQDdGGB2sPoRQSystd8LaPdSApMsjoloEPmrknlsDpTbIp8iSLYWuQrBZFxmNf2+r6c4q1aXPk2iR7iHIADNzuboT2pcc0YLiloGePk7BWX1eC3uLaYNdBBukRdozjoR2qK9El9dxadduVYkGOeFiGjfqAR/rTJCkRKylYzlMmRF61XhggjlaaGGDcWyHVAGAJ5JNK5fLkbf0VV0qW6gg/qV8wkVcMIyMMfeqdxoWbjZuJgJ/XjtV/VLj8lorU/nsMKzD+Me5qC2u73ToIv6ihYOONoPoOe9FGc43RjVincaYPOMZjbJOVXHLDsaDXNiIWaJmYlVyR0Iya9H1LXIrO1N2tvJMVYAiPG5Qf3c9qV9SLXitdSjDsDwQOaswZXJdC5RaECSNBIwy3X2rKts0wYjapwepFaq7kBRTjBJPGaOaXa7VMzAZ7UMsoy6rtGWbjmmS2tg6RKhKsvB9qDK60EEbKMkEEjNGNPQ7siEzBRkxqeT9Kis7aGWzaZZgXRtjKoztPsce9WrHUoJbqW009rfbsCrIZPVnuCO2Oa87JPuhkYHGvJLdvHHMrW8IGYCPUXYc7SK3o9tHFJcC9tjumw7Kef0qPbp0NE1eO2gM98Y3h3bmmdhtU9AAP4/mu204JGrWjcZZvXzyfgdce1JTdB6QD1DU/wOLyLLRQsFwTlEUjjk9/iutG1+w1e5eKKDy52UvIi5TzBjkjBwajGn3OoWzWUjW8SwzFl2Kdr/8AcV6Nz1NB9S0C70rUkuo9oXIETRPtLSEfyB1/inQhjktvYWqoLf1bSvxUU9lHvmzhUktyJVb2yR2Ofaj/AJNk15FPKSl3tJXJ5Zf9cHp7c+9eZafqE1lqBa5jSSSRiGkkB3Mfhs1du9YubmePzlaIo+wTpyUPZRz0xRZMEr+IMIfbCXjrRpb60iYRie4BbEuTgjrj4OM/HFIWkSXstylnDHGZXUwkSqDhCM8/5/YV6hpt5NLa/hrxp1kdRseJwSp9xjPX54qjb6aIonu9Y0wyXTXJW3iYAsqDPOB149ueab4/kcIOL9GSjvRL4Q8MWFnbQXU+Xut+Y352HjgjtzTVB56zmGORdpQsHdcAHPH1oVZX0NysthbyCGaLDb4Y94jIwcBQft/ai9veS3lpHOsflq3RJVKswHfHY/BqLM5SfKRrbujqWaXHKvujPOwBhIO4qhdavZPL5WWjlUj9Yz/l81ZjnidkjgV2Z3O/Yf0DHJJHbjH1qo91pl7Gbdzb3BRgJUhba0ZznJwc9aXGLfZiqyjqM2vWExNhBbTW+8s7F+ce3PJ49s0Vtruc28a3EJZmIZ3IACZGQuPjgVRVLuSbyrWNwu/CPLlSo6g9iR8+5pe8UeINX02OaLyGYBmXzWjzx8E9cZ4OKdjxvJUVo6cq/Y8W05dmHllYhgDkADJIOMc0LvtKuY5oJ9GYRhCxkgkYlJuwGece9eeaHp+saxqlnPfC4fS5kMzyJNkMoHQ4PByRxwetdXemeMNMmuksnuEtI2JSTzh+anwM9cDpVS8RRfHmr/YhZJd8R0vH1htQWe3skufw7AAOcbSTglc8dMc+1EdXS51K2aCKL0kYLn9x6cfeg/hGDUrfTDfahPLeXEit5Vu7j09xjPGTTJMLkmJ3RFCrnPXDY56VHk+L16KE+XYqyQ6la29rFdjz1c4GQdzD2PNHdQ0a1uYfy/ydiEY59XehniHXJ9GNpKYPxAeUhdo91OOT05xV6LUZ/wCkR3l2YIr103Ih4Un/AA/U9KNObUZ/Zjj3YmyiKKRo5I8sp/w1lGpIp53MpgMe/nYMEL8ZrKpti9CRoiKzZ3H09vmmKyZldSqg4HqyaDaOFyygerAwKZLWMqCqYz1am5ZbMOonu7DU/wARbeu3uAPPiJxyOhH2otHGIbp7qGF2uChlPlx53hc8H5Oar2+2SNAAOelGLSWG1jUiYRySjCOxG36D5qTJJLtDI2wXq7CC2TUY55JIp4vNaJ19IUd/jHFW7O0v2thELkQwMokcAZlTjnb7HHfH2rnWbf8AqUVozkW72zlirR5DjcP25GRx/eh34+9NwZrBhPch2YlVxwMZ6/FKjtKuwldbDOqwMkDx2ochGEheYbgcYOM988/xQTV9JvNRlgvUu2WSNhmEnChT+4E9fp81Z0u31PU31CCaR7a388MmMBzxk47AUWjtTYRyWp/Oh2bo/RgoO/8AJrXL8W0avoW18MpeTCW5XzdiIEk3YQ5JzwPat3HgiJbkXGny7LRQd8fllzK2c/xTJNp8MUYuTcMsEKF3HmkKwHJJ+KHLrU8tpc7le1kMjRWk0WG80YyCB7g5H2o4Zcr3ejnvrsj8PTtMJUuMfho8RwytgcjPH0o0LiTbubZujTdke59vbilrxHqmn2VrHHcXLrcug8wxRYLt3J7D3rejxyXmnvqVrL57zNjaMDIA5+/xSp4p1zfRsXC6C93rLWT2qSLCBeSqEMf6nJIz6ff5qG+eayvoY5b2KCSRs5OZAg3fqxx2Bz2HvRPS4bmzhhEkcQAJLsx5QHPTj6fzSf4h1V77U5okuBD5TmJdzkKSB2XueW+vSn4MayNJo6nbroZ4dW0ldREdpL5s0oGZUXd/ft24qMXUGmMpuolDzqd4DdSpxnHt3z80peDpbK616VJW3/hlFxA2dxVzgSL0Ge1NN7pVxdyt+ZbT2u/cPOjKsueSqsvOOldlxRhPi2B/oOW9yswSSBkAdNyt3ZfjNRyIzgFXzKoO9Uxzk9OR0NVrKG+a4a8n8gOAYkjil3DZnnkjjoDUkenpAPynYbyQWJzx8fT4qR6emcqBIiFlrltHbxeRFMzmVd2QcryR9/71lnfNALuzN4ks0QMlqw53gjIPA5x069qy70nzfElrMzKYlj8wozfqxxge/Y1HPo0MfiF71LiWAOmZFRu6nCsP/j2zT1xa+TOTCdpLFFbLcG2i3OqHEXOD3/j/AFri3juLhyt2kiwqxJRn4f2+cVtrawsbgKkr+ax9QZiWfPP/AD70RvLaGWCQPGXabqI2IL0hL6CckC5tU0pZjpt3EjmMZkRVDKnfBB9hV2/0yy1QDczB4gfLVThQSOGOOuKBa9pOn3FpDb3W5XSQlDCQHGcZB98gV3DrMUDy2YtJIp1USkBRyAMAnB9gPnFPtNJx7McLNzTNbytCYlJTjOQayjlv+EuYVmKBi/JJXGa1Xfml9gcTyXSZdtyue/FM8RKggDqKVbVD+IUg42mmi3YswGeCKtyrYLCFkwCKD19zV+6zPo1xBZW7RyxtlCyKwLDDZAPHJPxQuLbja3birsmt20MZ0qASC9aMsziM4UHIBB/ceBgCpmm910FEE3t7LMou724NrMsO/wApH3A9cdf9KK6Mslzp63kjtazXCNtQqAQpYZx81MdAs5JoLme5WW4hTIEi4Vj2LD4x0qSO+mhX8Jf2pMjSbkbdkZ69hx1pcpxaqPYz0WxPa2U62kEZSadRsZv3NjNWLuWJbcLe4kMi7WWM8k45AND7a7F6bqW9t0zbOy5C8sOoC9/vSbrOuu/4lpvLt/UVS3kJV0+uDyfrQwxSm9Ay+KtjotvZJCRd6Z5FmtvtWORvMypzlWUHHHHXNULjSI4bVXgma4t4Sdlu2E2qR+kMPg9686HijUNotpr65urQ8GFZioxjpkc/b4olpPiu8SOO3jWZCV2sGHb3JPQVZPx80Va6MxcZb9i5Lb3t/eP5MLhYyAA7fp9hnuafPCMUmkaWBqctvtWcyLEJMl+M/pxyasRaDFLYveKg8tQsgKQlXlI5I55/jFEZJ9MuIIbbUrI297KN0cZj9cYAPqH0+aLLmeSKhWjFCMZOSNP4gs7mNpFVyAFUb/0KM9x79fekM6nFHrBu32uu1gqMvK5XaB8cZ6f2onqcM2j2yT217Lb+YzbX2liVAOGIHHQj6ZBpOgiWecyzyKkIUySM4JPGSR9T/rVHj+Oob+xvNRh12PH/AE/DPq7akctvBXEUWxB3x/GP5703HTfxkEsSb7ZZmDylS29CeSBjAB6D+aA+ArmJbXYbm2SBg0uOjKAM4bJ5AHQim2a7tZmW2FwEYvhDDJypxnB7ZxUHlOTytgp60a2W0AdE3DKkZwTg/wDdQmwvNdkuZUKWzwo35bklTIM8ADn36nFFYkvDHBLNe7Z9uJIE2sD8lsZ6Cqt2syX4n82GQNIqrvOMLye3cVKlTa7YUWEdNuLueGSa7tgtxGShRQPuVJ7f7VWF/wCdbfjkgnBdSjwyABo+vJB69q2fxUKXN0jvN+ZkxkD0gY9P1xzn5qG8gluGDW0givXiJWJ2Zdynpn2H261tfoFVYDvG1G8uHSEXMEqH8ueJfSuMcHdx3HT3rf8AWtQEcZv7ryLfdtaYRkdTgbj2FEY9QltJTYa0IH8xd0bWsmS46HIwP/v7VDNo9hexmOzguN+/eTJNhvpyenwRTbS+MzXJWQR6gLsPHEwjnQt5TyHBfB+9ENLhuJJ4n1cI86kyIQMgcY/578VMmkQwKhgt4pAvoRl4ZM8HPv7VR1m2vp5YbbTpmjSU7Z23ECIKOTnrg+1Bq+K9m3Zq+8c6Lpt1JZTTy+ZCdpEajaOOgrKL2mlWlpbRwJFBIqDAcxLk/wBq1TK8f2n/AGDR5SeCCDTNoebxVjTAIBJJ7ADNCrrTxDLjIaIjcjj9y9jWadOY5WSBiM5BwcZ+KsntULexjySAU68H7UZaHSbGCK/vp1fYA0ank7u44680Asn/ACiu7BXpnr8V2LQTSARvIDvzsD4Ck9ce1Ttb70cHjq9tPatcQMhjXClgo/URnH/ig9np95Gbd4r2Say8rfLOeGHGcEe/+1U9O8La1a3zz211A0MGHEdw+euc5A7Y6dOKZZ70WLtDsR4oo+Ap3sAMY3f89qTkiseo7sZF2tAazvra6tZFG2OSRnUs3LEE7cqPt1qhpfhy0vZI9Tkmt5E8xlKTxF2yGIOcH4zz70Th0nRri2uZbBWilk9czheYd3PC/wA8/WhP/wCMapp04Om3hkXeHXgglcfu54HxTISir4ugntB4+GvD0F7FdQ2cEU0bPtVVwJdy+31/iu2gtrC+tUht9MhhO5ziLMnA7c/3qY6vaW1ul0vlFtwSZUcelvYfeqq3ljcTtfmKNlB8q3kL+qQ/uCgjjjJoFPK38mweKQQu9dtLGMSsyfhxzvJ6/Tt/5pBfxDY3uo3GoX4i/DujLEok2SKcjBGOf0j6E1F40uUtZQltcXS2U8Zd4Bjkjr9ccGkm+t57NY1kA9e2QkdQDyAT7/Hz816fh+KlHm+2LnlUHpDFdSTa1qslrps00yOcB5js3rjOCM4HI+5qZNIn064t7XVLN4obmXYs+4OpHwQf+CpvDFhKkP8AU1tBdQE7fKKgkjP6h9O/xT5HbabeW5k/DiOWIDCOSApHUA8Yx1+9Bn8jhKvQdWtCxpGi3emeXdHcIpZczyxRq+zDAbeTwp74pyk1jToI5ZpYOIgSuI/V7ce3Tr80Ng1HTruZNLhsi5JM21jwfk+9W38Pq98bqWWRLe4RVEUa8b+c5POOMcVDkm5yuRtJIXNN1yUPK93b+SLmUCPyozKsLH9IcDv8Z96L2utLd6rNpO1JriGAyPIvChxjj461e02xgUXOmz3asS3mCJU2KiDpx1Pyc0I1bUI9LkeOxtJpVkXc/oC8Act8j7962XCUmlE7k7DGn+ILd7FmhnUPF6pgeWUE8f7fSgl/qkGsXqyQ+bHj8t5o2OJU64I+vf5qzoqWEltcXltbqtwLfy/IXKFt3QnPX61Q1PVdO06ytjFGkZlJt1lUcxnjJNDGFSqKdhaZettPmbULbV4FjiupF8pkuGBHHTbzwe1FL+91WKPZBbwpIQfMZxnIxxgjoQfrSvb3Flf6sL4R3t1c24Cfh7dvygxP6j9cDr7UdF6mpyRpKz29y7eW0f7kb/UcV2VNNOjIxszw8LqGymdnnjuX9ZSYry3U4x2NW9L1tLoOJFBBUFsKBVd4rmGcywtPNsOdrqo3e+DS/wCJTD5FvdW63LsfTGQpATj9P1z1pcYLLIOVIYbueP8AEP5RKJ2UHpWUm2up63HAiPKhIGPUuTW6b/jy+0BzQP0TU0liXTb6QrG3/pSf4D7fSiyw/wBPcxSjD54wOvzSI79MdqP6RrSz26afqTYVeIp88x/B9xXsZ/H5biQYstaYy2s48xeBnvzRSMrkHhs8MB3pc/Dy2Uw8/lWGUkU5Uj60d06VPJ3hs5PevNlGirvZNDrEdg8lk8Em6c8kp6JQBjGRnt78/FUbLX7O11eNZVuNzjCXKgqn/s+mBwfiiVvcRwzI5AyjblJGaEeNbb8fbGdYpFSHLyiIjAXgZGOtDHHByprsLlSG3Sbm4vp7mY3OY1laOFiOWUYyR7jP+VTap+TIZwfVjnPb/evPv+nF0bqWWKyX8+MZeedyd2T0x2q5rFl4nk1Ux2MxWOd3G+VgqRcZJzycfagyeP8A+zg3/YUXa5Fe3gtdU15bdn8kQt5rvtLKTu6E/t+tceJzdXF49tBdW0jKv5xRzg4/SRxz2zU9hbX3hlbqa/EM8l1FslVGBTjkODjPHORxzXWta1p1iLZB/wDsSBNxKg4BGMg9R81QrU1w2v8ApjdrYmw2KHRXilUxXlpN+buXK7CCQBgE5z3q7pkVlNaNHcCR5/MGQzenHJ4AHJxnqe/ArnVdUS+njtLWPbNJHiZlTbvK5wPnrUNqZo7yGaeEwx+YuGfjBJ6kfY1dc3C3oCCV6HKFGRYJGDWz2gUrI8QyUP7OOGH+1FY7+G7u40aO63vEctIMR59sHk5z9qgk14W5VbC+gl3T7WSJdxCnPOf44o0blV3M8wklTn9HpXn+5rx80n20PXR5sTLNq91eQmSNrHBaKdjkRg42rtHTOevXPT3aPD3iayudRmkcSRXRhYPHEMJJgfu+faiviyZINCE97JukwPRHkBjnoAOeh+nvXl2uyRXOqG60vdHEdoRn4GMdDt4xVuOvIW1Qrk4po9HuLLTtaa31KO4kJJUYgx6j2B9h/tQDWZNZt5JZGdmgV3Q4cSFYycHaMYPHP1od4G1mWC5ltLu7e13hiHUZB/51oh4r1AR6WBBdSXc/Uzn08j2XtxxS445Ysqh2vRvJNWHtE1ZZorm8uI4vVsjXA5ZFGADVKWG0/o1089tc3NpNNvWOEBth7D5FIml315PJvEZIHpGBz9P701Weu3SWjwWSQrIsZCqP0rj3FbPBLHOzVJNaIL/xBJNo6afp0PksBlQfTj6AVV8INq1zezXMDu0jLh5ZDjawPH+tbni1TUkjhuGWEtgxjCgH+BmiP9estBhjs4GQ3TEK7Zzt9zRPUOEFbYPuwnr2uavDbm1tYo7i9jbloxnA/wAWKgW+vbiyR72aSM49aFQoJ+lVjdtdXzXUcvlSxAIzxjG/6HvVfU71pujFsDq3elRgkuNHNtuyN7s7zhsj6VlDyTnt/NZTuBtIV2k4qMyerOeajZqjLV7VHj2MujeI5LNBbXi/iLI9YieV+VPam+yKzQi40+Xz7f8Aw/uT4IrysSVcsNSutPm860lZH+DwftU2bxozX7HY8zj2eo+fuIz17CrUMrFHQE7XGG57UqaX4rsr9tupAW04/wD6oPS31HamSzTcMhkePs8bZBrzcmGWPtFUcil0HNKiRbWQpFHa3G9QZ1G1ZcAgZ+1WZr2Ca3SznMJvTGxQF+A+MDJH1oFPFH5qykglBwjdDS/qukSzXSSWJX1HDh5CePf3FSLEsk7kx/JKII1mPVba6l3GW6iQ7TPGpePOBnqCMjoaHRNa391Et3vjRFwY0O3d9M0T1C41DwvdhdJuZ0tJVDHPIJ6HrQC1uVOprLeb2SQn1L6Wye9ezjj8LRDtTD1xptuL5Gt5AzrksuSCgHQFu7GiGnyzSzWMMkLbJN0jErnavI6/XFELy4ttMsRawRxyNIfT5nJbPIyalur1Tughyr20alivG33xUEs0mui+K+iteRQwadBdjTGe1iYrcxeY0bcnIbjnrim/w/qq6hYlEsm8hfSwmPqz1x80t6jIuJp1kbyrhF3FDzjvweM4oZY6hqNndy2+nMJ4HwAHbGfbPzSZQeWFe0Gq9jPqHnrqEf8ARnMowQ0c8ZOOnoBPTI96j1rQ7HT9OmuodPR13eZJCTx06DHzQe6i1S1lS+Mk9w1wCJdi4UEcDPtxV+z8QwuWg85JLhzhg4yoOOmPag4zjXHr9HKmKkNxo17qC3U9ncJtZA0ETZGKZNeutFgu47q4s8FVwkKg5bPY0LOkz6feXLi4CwTv5iOUA3k8kD2q34Zs7fUtXnku5UmEQAVJAfT79apm4t8r0gOkVpNNg1UR/gh+ELth1zgfUfaiGk2GnQB0sWQxQqRJIRlye5yas3WjQaffPNpLSTPu3tE2CAPZTVZmmku5WRBFEwwYwM896Xy5Kk9BtJKyZtT0eUx7LhZ5VB8uNF5FKcWjQ/iJHfc25icuBnrR/wDD2Vod8cSK47gc0MdJ7u6ItlZyTxim41x1AV/L+Ru5eOFAkDY28cVHaW13qM4jgRiD1PtRSLw/DaRi61u4EEa8mMEbs12PFFjuNpYQ+XBjaJF/U1PjjbAllS6JP6BZx+ma7AkH6h81lYtiZQHEy4bmsovxi/yM8sPSoj1rVZXqI882K2K1WVxhqSruja1f6fMTazsozyDyDWVlDJJx2FF0z1XR7p9Sst9yqbtucqMVypKzYBPFZWV4mVJN0elHo3MiTkiVFb6iuLe0toC0qQRlwPSzKDj6VusoE/icuxI8QRsl7v8APmLFs8tTPqdw6aUJVx5hjUlsdTW6yn5+oHY+2KOr6pdiFEWTCoMACt6FczMstwXPmDv9qysqpRX4ugOT/IOuheIL14Yrd1hdGGDuXJ/zrvUNNtTqrP5eDwRjjH0rKyvMl8clIp9AxGkvIoFmlk/LZtpB5ro6dHbyHyJZk83l8P8Aq5rKynrpi32GILdFjByxIJPqbNV7iZtrDisrKRHs32caRYQ3tw/nlzgdAcVW8R6vc6POIdOEcCgYyq8n71usq7D2KzdCBfald30jfiZmb1E1a0oZKj5rKyr3/Ej9jzbsfIT6VlZWVONP/9k=", "isVegetarian": true, "isSpicy": true },
  { "id": "D_012", "name": "Sambar Sadham", "price": 80, "image": "data:image/jpeg;base64,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", "isVegetarian": true, "isSpicy": false },
   {
    "id": "N2007",
    "name": "Kadhai Paneer",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "North Indian",
    "rating": 4.6,
    "price": 170,
    "isAvailable": true,
    "description": "Paneer cooked with capsicum, tomatoes and spices.",
    "tags": ["Paneer", "Spicy", "Veg"]
  },
  {
    "id": "N2008",
    "name": "Jeera Rice",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "North Indian",
    "rating": 4.4,
    "price": 90,
    "isAvailable": true,
    "description": "Flavorful basmati rice tempered with cumin seeds.",
    "tags": ["Rice", "Veg"]
  },
        { "id": "1007_6", "name": "Egg Parotta", "image": "data:image/jpeg;base64,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", "cuisine": "Dhaba", "rating": 4.0, "price": 80, "isAvailable": true, "description": "Layered parotta stuffed with omelette.", "tags": ["Parotta", "Quick"] },
        { "id": "1007_7", "name": "Mutton Sukka", "image": "data:image/jpeg;base64,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", "cuisine": "Dhaba", "rating": 4.5, "price": 220, "isAvailable": true, "description": "Dry-style spicy mutton fry.", "tags": ["Mutton", "Spicy"] },


    ] }
  ],
  '1008': [ { category: 'Popular Items', items: [ { id: '1008_p1', name: 'Chicken Fried Rice', description: 'Wok fried rice with chicken', price: 160, image: 'data:image/jpeg;base64,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', isVegetarian: false, isSpicy: false }, { id: '1008_p2', name: 'Veg Manchurian', description: 'Crispy veg balls in sauce', price: 140, image: '/images/restaurants/1008.svg', isVegetarian: true, isSpicy: false } , { "id": "D_001", "name": "Veg Meals", "price": 120, "image": "img1", "isVegetarian": true, "isSpicy": false },
  { "id": "D_002", "name": "Non-Veg Meals", "price": 160, "image": "data:image/jpeg;base64,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", "isVegetarian": false, "isSpicy": true },
  { "id": "D_003", "name": "Chicken Biryani", "price": 180, "image": "data:image/jpeg;base64,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", "isVegetarian": false, "isSpicy": true },
  { "id": "D_004", "name": "Mutton Biryani", "price": 240, "image": "data:image/jpeg;base64,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", "isVegetarian": false, "isSpicy": true },
  { "id": "D_005", "name": "Egg Biryani", "price": 130, "image": "data:image/jpeg;base64,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", "isVegetarian": false, "isSpicy": false },
  { "id": "D_006", "name": "Veg Biryani", "price": 110, "image": "data:image/jpeg;base64,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", "isVegetarian": true, "isSpicy": false },
  { "id": "D_007", "name": "Mushroom Biryani", "price": 140, "image": "data:image/jpeg;base64,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", "isVegetarian": true, "isSpicy": true },
  {
    "id": "N2007",
    "name": "Kadhai Paneer",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "North Indian",
    "rating": 4.6,
    "price": 170,
    "isAvailable": true,
    "description": "Paneer cooked with capsicum, tomatoes and spices.",
    "tags": ["Paneer", "Spicy", "Veg"]
  },
  {
    "id": "N2008",
    "name": "Jeera Rice",
    "image": "data:image/jpeg;base64,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",
    "cuisine": "North Indian",
    "rating": 4.4,
    "price": 90,
    "isAvailable": true,
    "description": "Flavorful basmati rice tempered with cumin seeds.",
    "tags": ["Rice", "Veg"]
  },
  { "id": "1007_4", "name": "Kothu Parotta (Egg)", "image": "data:image/jpeg;base64,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", "cuisine": "Dhaba", "rating": 4.3, "price": 140, "isAvailable": true, "description": "Shredded parotta stir-fried with egg and spices.", "tags": ["Kothu", "Street"] },
        { "id": "1007_5", "name": "Kothu Parotta (Chicken)", "image": "data:image/jpeg;base64,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", "cuisine": "Dhaba", "rating": 4.4, "price": 160, "isAvailable": true, "description": "Spiced shredded parotta with chicken.", "tags": ["Kothu", "Spicy"] },


] } ],
  '1009': [ { category: 'Popular Items', items: [ { id: '1009_p1', name: 'Mutton Biryani', description: 'Madurai style mutton biryani', price: 320, image: 'data:image/jpeg;base64,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', isVegetarian: false, isSpicy: true }, { "id": "1010_15", "name": "Chicken Fried Rice", "image": "https://images.unsplash.com/photo-1604908179830-7f2b6d8f4f5b", "cuisine": "Chinese", "rating": 4.1, "price": 150, "isAvailable": true, "description": "Wok-fried rice with chicken.", "tags": ["Rice", "Chicken"] },
{ id: '1009_p2', name: 'Fish Fry', description: 'Crispy fried fish', price: 220, image: 'data:image/jpeg;base64,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', isVegetarian: false, isSpicy: true } ] }, { category: 'Madurai Specials', items: [ { id: '1009_1', name: 'Muniyandi Mutton', description: 'Spicy mutton curry', price: 260, image: '/images/restaurants/1009.svg', isVegetarian: false, isSpicy: true }, { "id": "1007_5", "name": "Kothu Parotta (Chicken)", "image": "https://images.unsplash.com/photo-1589307000271-4b8d10d3d6d0", "cuisine": "Dhaba", "rating": 4.4, "price": 160, "isAvailable": true, "description": "Spiced shredded parotta with chicken.", "tags": ["Kothu", "Spicy"] },
        { "id": "1007_6", "name": "Egg Parotta", "image": "https://images.unsplash.com/photo-1551218808-94e220e084d2", "cuisine": "Dhaba", "rating": 4.0, "price": 80, "isAvailable": true, "description": "Layered parotta stuffed with omelette.", "tags": ["Parotta", "Quick"] },
        { "id": "1007_7", "name": "Mutton Sukka", "image": "https://images.unsplash.com/photo-1604908176991-a3f3d98c8f3d", "cuisine": "Dhaba", "rating": 4.5, "price": 220, "isAvailable": true, "description": "Dry-style spicy mutton fry.", "tags": ["Mutton", "Spicy"] },
        { "id": "1007_8", "name": "Chicken Sukka", "image": "https://images.unsplash.com/photo-1598511721075-9f0b9d8c4f8d", "cuisine": "Dhaba", "rating": 4.4, "price": 180, "isAvailable": true, "description": "Dry chicken roast with local spices.", "tags": ["Chicken", "Starter"] },
        { "id": "1007_9", "name": "Fish Fry", "image": "https://images.unsplash.com/photo-1543353071-087092ec393a", "cuisine": "Dhaba", "rating": 4.3, "price": 200, "isAvailable": true, "description": "Crispy fried fish with masala.", "tags": ["Fish", "Crispy"] },
        { "id": "1007_10", "name": "Egg Curry with Rice", "image": "https://images.unsplash.com/photo-1598866548410-3c85a1a3b6d8", "cuisine": "Dhaba", "rating": 4.1, "price": 110, "isAvailable": true, "description": "Boiled eggs in spiced curry served with rice.", "tags": ["Egg", "Comfort"] },
 ] } ],
  '1010': [ { category: 'Popular Items', items: [ { id: '1010_p1', name: 'Chicken Parotta', description: 'Flaky parotta with chicken curry', price: 150, image: '/images/restaurants/1010.svg', isVegetarian: false, isSpicy: true },     { "id": "1007_8", "name": "Chicken Sukka", "image": "https://images.unsplash.com/photo-1598511721075-9f0b9d8c4f8d", "cuisine": "Dhaba", "rating": 4.4, "price": 180, "isAvailable": true, "description": "Dry chicken roast with local spices.", "tags": ["Chicken", "Starter"] },
        { "id": "1007_9", "name": "Fish Fry", "image": "https://images.unsplash.com/photo-1543353071-087092ec393a", "cuisine": "Dhaba", "rating": 4.3, "price": 200, "isAvailable": true, "description": "Crispy fried fish with masala.", "tags": ["Fish", "Crispy"] },
        { "id": "1007_10", "name": "Egg Curry with Rice", "image": "https://images.unsplash.com/photo-1598866548410-3c85a1a3b6d8", "cuisine": "Dhaba", "rating": 4.1, "price": 110, "isAvailable": true, "description": "Boiled eggs in spiced curry served with rice.", "tags": ["Egg", "Comfort"] },
        { "id": "1007_11", "name": "Vegetable Kurma", "image": "https://images.unsplash.com/photo-1604908177333-1c5b6a8f7a2a", "cuisine": "Dhaba", "rating": 4.0, "price": 110, "isAvailable": true, "description": "Mixed veg curry with coconut base.", "tags": ["Veg", "Curry"] },
        { "id": "1007_12", "name": "Mushroom Pepper Fry", "image": "https://images.unsplash.com/photo-1617191517912-3c034a6a2f3d", "cuisine": "Dhaba", "rating": 4.2, "price": 140, "isAvailable": true, "description": "Peppery mushroom dry-fry.", "tags": ["Mushroom", "Spicy"] },
        { "id": "1007_13", "name": "Veg Fried Rice", "image": "https://images.unsplash.com/photo-1604908176953-6d1b9c8f3f3b", "cuisine": "Multi Cuisine", "rating": 4.0, "price": 120, "isAvailable": true, "description": "Wok-fried rice with vegetables.", "tags": ["Rice", "Veg"] }, { id: '1010_p2', name: 'Dosa', description: 'Plain or masala dosa', price: 80, image: '/images/restaurants/1010.svg', isVegetarian: true, isSpicy: false } ] }, { category: 'Hotel Specials', items: [ { id: '1010_1', name: 'Hotel Combo Meal', description: 'Rice, sambar, 2 veg curries', price: 130, image: '/images/restaurants/1010.svg', isVegetarian: true, isSpicy: false } ] } ],
  '1011': [ { category: 'Popular Items', items: [ { id: '1011_p1', name: 'Egg Parotta', description: 'Layered parotta with egg', price: 80, image: '/images/restaurants/1011.svg', isVegetarian: false, isSpicy: false },{ "id": "1010_30", "name": "Ice Cream Cup", "image": "https://images.unsplash.com/photo-1604908180067-6f2b6d8f3o4k", "cuisine": "Dessert", "rating": 4.1, "price": 60, "isAvailable": true, "description": "Single scoop ice cream cup.", "tags": ["Dessert", "Cold"] },
        { "id": "1010_31", "name": "Fruit Salad", "image": "https://images.unsplash.com/photo-1604908180090-7f2b6d8f4p5l", "cuisine": "Dessert", "rating": 4.0, "price": 80, "isAvailable": true, "description": "Seasonal fresh fruit bowl.", "tags": ["Healthy", "Dessert"] },
        { "id": "1010_32", "name": "Masala Tea", "image": "https://images.unsplash.com/photo-1604908180113-8f2b6d8f5q6m", "cuisine": "Beverage", "rating": 4.1, "price": 20, "isAvailable": true, "description": "Spiced hot tea.", "tags": ["Tea", "Hot"] },
        { "id": "1010_33", "name": "Filter Coffee", "image": "https://images.unsplash.com/photo-1604908180136-9f2b6d8f6r7n", "cuisine": "Beverage", "rating": 4.2, "price": 25, "isAvailable": true, "description": "Strong south Indian coffee.", "tags": ["Coffee", "Hot"] },
        { "id": "1010_34", "name": "Fresh Lime Soda", "image": "https://images.unsplash.com/photo-1604908180159-0f2b6d8f7s8o", "cuisine": "Beverage", "rating": 4.0, "price": 35, "isAvailable": true, "description": "Refreshing lime soda (sweet/salted).", "tags": ["Beverage", "Cold"] },
        { "id": "1010_35", "name": "Masala Omelette", "image": "https://images.unsplash.com/photo-1604908180182-1f2b6d8f8t9p", "cuisine": "Breakfast", "rating": 4.0, "price": 50, "isAvailable": true, "description": "Egg omelette with masala.", "tags": ["Egg", "Breakfast"] }, { id: '1011_p2', name: 'South Indian Thali', description: 'Mini thali with sambar and 2 curries', price: 110, image: '/images/restaurants/1011.svg', isVegetarian: true, isSpicy: false } ] }, { category: 'Quick Bites', items: [ { id: '1011_1', name: 'Chicken Roll', description: 'Spicy chicken roll', price: 80, image: '/images/restaurants/1011.svg', isVegetarian: false, isSpicy: true } ] } ],
  '1012': [ { category: 'Popular Items', items: [ { id: '1012_p1', name: 'South Indian Thali', description: 'Traditional thali with rice and curries', price: 150, image: '/images/restaurants/1012.svg', isVegetarian: true, isSpicy: false }, { "id": "1010_25", "name": "Prawn Pepper Fry", "image": "https://images.unsplash.com/photo-1604908179955-2f2b6d8f9k0g", "cuisine": "Seafood", "rating": 4.5, "price": 260, "isAvailable": true, "description": "Pepper-flavored prawn fry.", "tags": ["Prawn", "Pepper"] },
        { "id": "1010_26", "name": "Veg Spring Rolls (6 pcs)", "image": "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f", "cuisine": "Starter", "rating": 4.1, "price": 100, "isAvailable": true, "description": "Crispy veg rolls.", "tags": ["Starter", "Veg"] },
        { "id": "1010_27", "name": "Chicken Spring Rolls (6 pcs)", "image": "https://images.unsplash.com/photo-1604908179998-3f2b6d8f0l1h", "cuisine": "Starter", "rating": 4.2, "price": 120, "isAvailable": true, "description": "Chicken-filled crispy rolls.", "tags": ["Starter", "Chicken"] },
        { "id": "1010_28", "name": "Gulab Jamun (2 pcs)", "image": "https://images.unsplash.com/photo-1604908180021-4f2b6d8f1m2i", "cuisine": "Dessert", "rating": 4.2, "price": 50, "isAvailable": true, "description": "Syrupy milk dumplings.", "tags": ["Dessert", "Sweet"] },
        { "id": "1010_29", "name": "Rasmalai (2 pcs)", "image": "https://images.unsplash.com/photo-1604908180044-5f2b6d8f2n3j", "cuisine": "Dessert", "rating": 4.2, "price": 70, "isAvailable": true, "description": "Soft paneer discs in sweetened milk.", "tags": ["Dessert", "Sweet"] },
{ id: '1012_p2', name: 'Chicken 65', description: 'Fried spicy chicken', price: 140, image: '/images/restaurants/1012.svg', isVegetarian: false, isSpicy: true } ] }, { category: 'Family Platters', items: [ { id: '1012_1', name: 'Family Platter', description: 'Serves 4', price: 450, image: '/images/restaurants/1012.svg', isVegetarian: false, isSpicy: false } ] } ],
  '1013': [ { category: 'Popular Items', items: [ { id: '1013_p1', name: 'Veg Thali', description: 'Seasonal veg with rice', price: 90, image: '/images/restaurants/1013.svg', isVegetarian: true, isSpicy: false }, { id: '1013_p2', name: 'Gobi 65', description: 'Crispy fried cauliflower', price: 120, image: '/images/restaurants/1013.svg', isVegetarian: true, isSpicy: true } ] }, { category: 'Home Style', items: [ { id: '1013_1', name: 'Veg Thali', description: 'Seasonal veg with rice', price: 90, image: '/images/restaurants/1013.svg', isVegetarian: true, isSpicy: false } ] } ],
  '1014': [ { category: 'Popular Items', items: [ { id: '1014_p1', name: 'Budget Thali', description: 'Economical thali', price: 75, image: '/images/restaurants/1014.svg', isVegetarian: true, isSpicy: false }, { id: '1014_p2', name: 'Fish Fry', description: 'Crispy fried fish', price: 200, image: '/images/restaurants/1014.svg', isVegetarian: false, isSpicy: true } ] }, { category: 'Thali Specials', items: [ { id: '1014_1', name: 'Budget Thali', description: 'Economical thali', price: 75, image: '/images/restaurants/1014.svg', isVegetarian: true, isSpicy: false } ] } ],
  '1015': [ { category: 'Popular Items', items: [ { id: '1015_p1', name: 'Kumar Biryani', description: 'Local style biryani', price: 150, image: '/images/restaurants/1015.svg', isVegetarian: false, isSpicy: false }, { id: '1015_p2', name: 'Parotta with Curry', description: 'Parotta served with curry', price: 120, image: '/images/restaurants/1015.svg', isVegetarian: false, isSpicy: true } ] }, { category: 'Biryani & Meals', items: [ { id: '1015_1', name: 'Kumar Biryani', description: 'Local style biryani', price: 150, image: '/images/restaurants/1015.svg', isVegetarian: false, isSpicy: false } ] } ],
  '1016': [ { category: 'Popular Items', items: [ { id: '1016_p1', name: 'Uttapam', description: 'Thick uttapam with chutney', price: 80, image: '/images/restaurants/1016.svg', isVegetarian: true, isSpicy: false }, { id: '1016_p2', name: 'Dosa', description: 'Plain or masala dosa', price: 90, image: '/images/restaurants/1016.svg', isVegetarian: true, isSpicy: false } ] }, { category: 'Tiffin', items: [ { id: '1016_1', name: 'Uttapam', description: 'Thick uttapam with chutney', price: 80, image: '/images/restaurants/1016.svg', isVegetarian: true, isSpicy: false } ] } ],
  '1017': [ { category: 'Popular Items', items: [ { id: '1017_p1', name: 'Grilled Fish', description: 'Seasonal grilled fish', price: 280, image: '/images/restaurants/1017.svg', isVegetarian: false, isSpicy: false }, { id: '1017_p2', name: 'Fish Curry', description: 'Coconut-based fish curry', price: 240, image: '/images/restaurants/1017.svg', isVegetarian: false, isSpicy: true } ] }, { category: 'Garden Specials', items: [ { id: '1017_1', name: 'Grilled Fish', description: 'Seasonal grilled fish', price: 280, image: '/images/restaurants/1017.svg', isVegetarian: false, isSpicy: false } ] } ],
  '1018': [ { category: 'Popular Items', items: [ { id: '1018_p1', name: 'Cheese Burger', description: 'Classic burger', price: 120, image: '/images/restaurants/1018.svg', isVegetarian: false, isSpicy: false }, { id: '1018_p2', name: 'Fries', description: 'Crispy french fries', price: 60, image: '/images/restaurants/1018.svg', isVegetarian: true, isSpicy: false } ] }, { category: 'Fast Food', items: [ { id: '1018_1', name: 'Cheese Burger', description: 'Classic burger', price: 120, image: '/images/restaurants/1018.svg', isVegetarian: false, isSpicy: false } ] } ],
  '1019': [ { category: 'Popular Items', items: [ { id: '1019_p1', name: 'Chicken Biryani', description: 'Flavorful biryani', price: 150, image: '/images/restaurants/1019.svg', isVegetarian: false, isSpicy: false }, { id: '1019_p2', name: 'Parotta with Curry', description: 'Parotta served with curry', price: 120, image: '/images/restaurants/1019.svg', isVegetarian: false, isSpicy: true } ] }, { category: 'Biryani & Combos', items: [ { id: '1019_1', name: 'Ajmeer Chicken Biryani', description: 'Flavorful biryani', price: 150, image: '/images/restaurants/1019.svg', isVegetarian: false, isSpicy: false } ] } ],
  '1020': [ { category: 'Popular Items', items: [ { id: '1020_p1', name: 'Kothu Parotta', description: 'Chopped parotta with egg/meat', price: 140, image: '/images/restaurants/1020.svg', isVegetarian: false, isSpicy: true }, { id: '1020_p2', name: 'Kongu Panju Parotta', description: 'Soft layered parotta', price: 40, image: '/images/restaurants/1020.svg', isVegetarian: false, isSpicy: false } ] }, { category: 'Parotta Stall', items: [ { id: '1020_1', name: 'Kongu Panju Parotta', description: 'Soft layered parotta', price: 40, image: '/images/restaurants/1020.svg', isVegetarian: false, isSpicy: false } ] } ],
  '1021': [ { category: 'Popular Items', items: [ { id: '1021_p1', name: 'Daily Thali', description: 'Daily thali with 2 curries', price: 85, image: '/images/restaurants/1021.svg', isVegetarian: true, isSpicy: false }, { id: '1021_p2', name: 'Fresh Juice', description: 'Seasonal fresh juice', price: 60, image: '/images/restaurants/1021.svg', isVegetarian: true, isSpicy: false } ] }, { category: 'Mess Meals', items: [ { id: '1021_1', name: 'Ganapathy Thali', description: 'Daily thali', price: 85, image: '/images/restaurants/1021.svg', isVegetarian: true, isSpicy: false } ] } ],
  '1022': [ { category: 'Popular Items', items: [ { id: '1022_p1', name: 'Veg Meals', description: 'Mixed veg with rice', price: 80, image: '/images/restaurants/1022.svg', isVegetarian: true, isSpicy: false }, { id: '1022_p2', name: 'Idli Sambhar', description: 'Soft idli with sambar', price: 60, image: '/images/restaurants/1022.svg', isVegetarian: true, isSpicy: false } ] }, { category: 'Vegetarian Delights', items: [ { id: '1022_1', name: 'Veg Meals', description: 'Mixed veg with rice', price: 80, image: '/images/restaurants/1022.svg', isVegetarian: true, isSpicy: false } ] } ],
  '1023': [ { category: 'Popular Items', items: [ { id: '1023_p1', name: 'Chicken Curry', description: 'Local curry with rice or parotta', price: 130, image: '/images/restaurants/1023.svg', isVegetarian: false, isSpicy: true }, { id: '1023_p2', name: 'Soft Drink / Lassi', description: 'Beverage options', price: 40, image: '/images/restaurants/1023.svg', isVegetarian: true, isSpicy: false } ] }, { category: 'Local Favorites', items: [ { id: '1023_1', name: 'Shrees Combo', description: 'Mix of local dishes', price: 140, image: '/images/restaurants/1023.svg', isVegetarian: false, isSpicy: false } ] } ],
  // Perundurai menus
  '1001': [
    {
      items: [
        
      { id: '1001_1', name: "Idli",  price: 60, image: 'https://cdn.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818_1280.jpg', isVegetarian: false, isSpicy: false },
        { id: '1001_2', name: "Medu Vada",  price: 1, image: 'https://media.istockphoto.com/id/2159618192/photo/south-indian-vada-medu-vada.jpg?s=612x612&w=0&k=20&c=0CGPDnmTDMQ1It9FboMbNsjFiSS4QF4WTlMCyFEBZwk=', isVegetarian: false, isSpicy: true },
      { id: '1001_3', name: 'Masala Dosa',  price: 80, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?cs=srgb&dl=pexels-saveurssecretes-5560763.jpg&fm=jpg', isVegetarian: false, isSpicy: true },
        { id: '1001_4', name: 'Onion Uttapam', price: 70, image: 'https://www.sharmispassions.com/wp-content/uploads/2012/10/OnionUttapam2.jpg', isVegetarian: true, isSpicy: false },
        { id: '1001_5', name: 'Pongal',  price: 90, image: 'https://t3.ftcdn.net/jpg/09/47/78/88/240_F_947788861_jTKFtYXCiXJ53n8q5ReZj0KsOvCY06YK.jpg', isVegetarian: false, isSpicy: true },
{ id: '1001_6', name: "Sambar Rice", price: 80, image: 'https://t4.ftcdn.net/jpg/04/97/27/31/360_F_497273192_FaNrcQGMMpQeBGitqp04l0XwwgXmvPmO.jpg', isVegetarian: false, isSpicy: false },
        { id: '1001_7', name: "Chapati / Roti", price: 40, image: 'https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2025/02/chapati-bread-header.jpg', isVegetarian: false, isSpicy: true },
      { id: '1001_8', name: 'Kootu', price: 120, image: 'https://t3.ftcdn.net/jpg/04/48/22/02/360_F_448220244_sDh8CUQS8xvAeniSF8xPPB9AmZ6mkNwY.jpg', isVegetarian: false, isSpicy: true },
        { id: '1001_9', name: 'Payasam',  price: 90, image: 'https://images.getrecipekit.com/20231006064107-kerala-20special-20payasam.jpg?aspect_ratio=16:9&quality=90&', isVegetarian: true, isSpicy: false },
        { id: '1001_10', name: 'Paniyaram', price: 50, image: 'https://www.shutterstock.com/image-photo/kuzhi-paniyaram-served-coconut-chutney-600nw-1772992649.jpg', isVegetarian: false, isSpicy: true },
         ]
    }
  ],
  '1002': [
    {
      items: [
        
  { 
    id: '1001_1', 
    name: "Veg Meals", 
    price: 120,       // Updated
    image: 'data:image/jpeg;base64,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', 
    isVegetarian: false, 
    isSpicy: false 
  },

  { 
    id: '1001_2', 
    name: "Nattu Kozhi Varuval", 
    price: 160,       // Updated
    image: 'https://i.pinimg.com/564x/95/21/dd/9521dd23e7fb9d9e8fd9913d4e6c2895.jpg', 
    isVegetarian: false, 
    isSpicy: true 
  },

  { 
    id: '1001_3', 
    name: "Non-Veg Meals", 
    price: 150,       // Updated
    image: 'https://thumbs.dreamstime.com/b/delicious-indian-thali-served-banana-leaf-rice-lentils-curries-fried-chicken-assorted-vegetables-393140235.jpg', 
    isVegetarian: false, 
    isSpicy: true 
  },

  { 
    id: '1001_4', 
    name: "Kal Dosa", 
    price: 50,        // Updated
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/85/15/08/kal-dosa.jpg', 
    isVegetarian: true, 
    isSpicy: false 
  },

  { 
    id: '1001_5', 
    name: "Kudal Curry Fry", 
    price: 180,       // Updated
    image: 'https://i.pinimg.com/564x/39/e2/83/39e2836452f2bb40bf1a80df1e212001.jpg', 
    isVegetarian: false, 
    isSpicy: true 
  },

  { 
    id: '1001_6', 
    name: "Ghee Roast", 
    price: 90,        // Updated
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRK9KYyEd9geJAvlvgCGYGWAGaO085fXNzPw&sg', 
    isVegetarian: false, 
    isSpicy: false 
  },

  { 
    id: '1001_7', 
    name: "Egg Dosa", 
    price: 60,        // Updated
    image: 'https://thumbs.dreamstime.com/b/delicious-masala-dosa-sides-vibrant-generated-ai-south-indian-crepe-filled-spiced-potatoes-vegetables-served-383817116.jpg', 
    isVegetarian: false, 
    isSpicy: true 
  },

  { 
    id: '1001_8', 
    name: "Onion Uttapam", 
    price: 70,        // Updated
    image: 'https://www.sharmispassions.com/wp-content/uploads/2012/10/OnionUttapam2.jpg', 
    isVegetarian: false, 
    isSpicy: true 
  },

  { 
    id: '1001_9', 
    name: "Payasam", 
    price: 40,        // Updated
    image: 'https://images.getrecipekit.com/20231006064107-kerala-20special-20payasam.jpg?aspect_ratio=16:9&quality=90&', 
    isVegetarian: true, 
    isSpicy: false 
  },

  { 
    id: '1001_10', 
    name: "Egg Paniyaram", 
    price: 70,        // Updated
    image: 'https://i.ytimg.com/vi/-0XlcSx1lNs/maxresdefault.jpg', 
    isVegetarian: false, 
    isSpicy: true 
  }
]

      
    }
  ],
  '1003': [
    {
      category: 'Snacks & Sweets',
      items: [
        {
          id: 'p1003_1',
          name: 'Samosa (2 pcs)',
          description: 'Crispy pastry filled with spiced potato',
          price: 40,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200',
          isVegetarian: true,
          isSpicy: true,
        },
        {
          id: 'p1003_2',
          name: 'Sweet Box',
          description: 'Assorted Indian sweets',
          price: 80,
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200',
          isVegetarian: true,
          isSpicy: false,
        }
      ]
    }
  ],
};

export const mockCuisines = [
  { id: '1', name: 'South Indian', image: '🍛', description: 'Traditional South Indian cuisine' },
  { id: '2', name: 'Chettinad', image: '🌶️', description: 'Spicy Chettinad specialties' },
  { id: '3', name: 'Multi Cuisine', image: '🍽️', description: 'Variety of cuisines' },
  { id: '4', name: 'North Indian', image: '🍛', description: 'Rich North Indian dishes' },
  { id: '5', name: 'Chinese', image: '🥢', description: 'Indo-Chinese favorites' },
  { id: '6', name: 'Italian', image: '🍝', description: 'Italian pasta and pizza' },
  { id: '7', name: 'Thai', image: '🍜', description: 'Authentic Thai cuisine' },
  { id: '8', name: 'Mexican', image: '🌮', description: 'Spicy Mexican food' },
];

export const mockOrders = [
  {
    id: 'order1',
    restaurant: {
      id: '1',
      name: 'Pizza Palace',
      image: '/api/placeholder/60/60',
    },
    items: [
      {
        id: 'pizza1',
        name: 'Margherita Pizza',
        price: 16.99,
        quantity: 1,
        totalPrice: 16.99,
      },
      {
        id: 'app1',
        name: 'Garlic Bread',
        price: 6.99,
        quantity: 2,
        totalPrice: 13.98,
      },
    ],
    status: 'delivered',
    total: 33.96,
    createdAt: '2024-01-15T18:30:00Z',
    deliveryAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    estimatedDeliveryTime: '30-40 min',
  },
  {
    id: 'order2',
    restaurant: {
      id: '2',
      name: 'Burger Barn',
      image: '/api/placeholder/60/60',
    },
    items: [
      {
        id: 'burger1',
        name: 'Classic Cheeseburger',
        price: 12.99,
        quantity: 2,
        totalPrice: 25.98,
      },
      {
        id: 'side1',
        name: 'French Fries',
        price: 4.99,
        quantity: 2,
        totalPrice: 9.98,
      },
    ],
    status: 'on_the_way',
    total: 38.95,
    createdAt: '2024-01-16T19:15:00Z',
    deliveryAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    estimatedDeliveryTime: '15-25 min',
  },
  {
    id: 'order3',
    restaurant: {
      id: '3',
      name: 'Sushi Zen',
      image: '/api/placeholder/60/60',
    },
    items: [
      {
        id: 'sushi1',
        name: 'California Roll',
        price: 8.99,
        quantity: 3,
        totalPrice: 26.97,
      },
    ],
    status: 'preparing',
    total: 29.96,
    createdAt: '2024-01-16T20:00:00Z',
    deliveryAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    estimatedDeliveryTime: '35-45 min',
  },
];

// No default user - require proper authentication
export const mockUser = null;

// Mock API responses for development
export const mockApiResponses = {
  '/api/restaurants': {
    restaurants: mockRestaurants,
    total: mockRestaurants.length,
  },
  '/api/cuisines': {
    cuisines: mockCuisines,
  },
  '/api/orders': {
    orders: mockOrders,
  },
  '/api/auth/me': {
    user: null, // No default user
  },
};

// Ensure every Perundurai restaurant has at least 10 menu items in mockMenus
(() => {
  const perunduraiRestaurants = mockRestaurants.filter(r => (r.city || '').toLowerCase() === 'perundurai');
  perunduraiRestaurants.forEach((r) => {
    const id = r.id;
    mockMenus[id] = mockMenus[id] || [];

    // Count current items
    let existingCount = 0;
    mockMenus[id].forEach(cat => { existingCount += (cat.items || []).length; });

    // If fewer than 10, add placeholder items across categories
    const toAdd = Math.max(0, 10 - existingCount);
    if (toAdd > 0) {
      const category = mockMenus[id].length > 0 ? mockMenus[id][0].category : 'Chef Specials';
      if (mockMenus[id].length === 0) mockMenus[id].push({ category, items: [] });

      for (let i = 0; i < toAdd; i++) {
        const itemId = `${id}_gen_${Date.now().toString().slice(-5)}_${i}`;
        mockMenus[id][0].items.push({
          id: itemId,
          name: `${r.name.split(' ')[0]} Special ${i + 1}`,
          description: `Delicious ${r.cuisine} dish prepared fresh by ${r.name}.`,
          price: Math.round(50 + Math.random() * 200),
          image: r.image || '/images/placeholder-food.jpg',
          isVegetarian: Math.random() > 0.5,
          isSpicy: Math.random() > 0.5,
        });
      }
    }
  });
})();

// Helper function to simulate API delay
export const simulateApiDelay = (ms = 100) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API service for development
export const mockApiService = {
  get: async (url, params = {}) => {
    console.log('Mock API GET request:', { url, params });
    await simulateApiDelay(100);
    
    // Handle restaurant filtering
    if (url === '/api/restaurants') {
      console.log('Fetching restaurants with params:', params);
      let filteredRestaurants = [...mockRestaurants];
      
      // Search by name, cuisine, or tags
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchTerm) ||
          restaurant.cuisine.toLowerCase().includes(searchTerm) ||
          restaurant.description.toLowerCase().includes(searchTerm) ||
          restaurant.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          restaurant.city.toLowerCase().includes(searchTerm) ||
          restaurant.area.toLowerCase().includes(searchTerm)
        );
      }
      
      // Filter by cuisine
      if (params.cuisine) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.cuisine.toLowerCase() === params.cuisine.toLowerCase()
        );
      }
      
      // Default city to Perundurai when not provided (lock the mock API to the locality)
      const effectiveCity = params.city || 'Perundurai';
      if (effectiveCity) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.city.toLowerCase() === effectiveCity.toLowerCase()
        );
      }
      
      // Filter by vegetarian/non-vegetarian
      if (params.dietary) {
        if (params.dietary === 'vegetarian') {
          filteredRestaurants = filteredRestaurants.filter(restaurant =>
            restaurant.tags.some(tag => tag.toLowerCase().includes('vegetarian'))
          );
        } else if (params.dietary === 'non-vegetarian') {
          filteredRestaurants = filteredRestaurants.filter(restaurant =>
            restaurant.tags.some(tag => tag.toLowerCase().includes('non-vegetarian'))
          );
        }
      }
      
      // Filter by price range
      if (params.priceRange) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.priceRange === parseInt(params.priceRange)
        );
      }
      
      // Filter by rating
      if (params.minRating) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.rating >= parseFloat(params.minRating)
        );
      }
      
      // Sort restaurants
      if (params.sortBy) {
        switch (params.sortBy) {
          case 'rating':
            filteredRestaurants.sort((a, b) => b.rating - a.rating);
            break;
          case 'deliveryTime':
            filteredRestaurants.sort((a, b) => {
              const aTime = parseInt(a.deliveryTime.split('-')[0]);
              const bTime = parseInt(b.deliveryTime.split('-')[0]);
              return aTime - bTime;
            });
            break;
          case 'deliveryFee':
            filteredRestaurants.sort((a, b) => a.deliveryFee - b.deliveryFee);
            break;
          case 'name':
            filteredRestaurants.sort((a, b) => a.name.localeCompare(b.name));
            break;
          default:
            // Default sort by featured first, then rating
            filteredRestaurants.sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return b.rating - a.rating;
            });
        }
      }
      
      console.log('Returning restaurants:', filteredRestaurants.length);
      return {
        data: {
          restaurants: filteredRestaurants,
          total: filteredRestaurants.length,
        }
      };
    }
    
    // Handle dish search across all menus
    if (url === '/api/dishes/search') {
      let allDishes = [];
      
      // Collect all dishes from all restaurants
      Object.keys(mockMenus).forEach(restaurantId => {
        const restaurant = mockRestaurants.find(r => r.id === restaurantId);
        if (restaurant) {
          mockMenus[restaurantId].forEach(category => {
            category.items.forEach(dish => {
              allDishes.push({
                ...dish,
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                restaurantImage: restaurant.image,
                restaurantRating: restaurant.rating,
                deliveryTime: restaurant.deliveryTime,
                deliveryFee: restaurant.deliveryFee,
                category: category.category
              });
            });
          });
        }
      });
      
      // Filter dishes
      let filteredDishes = allDishes;
      
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredDishes = filteredDishes.filter(dish =>
          dish.name.toLowerCase().includes(searchTerm) ||
          dish.description.toLowerCase().includes(searchTerm) ||
          dish.category.toLowerCase().includes(searchTerm)
        );
      }
      
      if (params.dietary) {
        if (params.dietary === 'vegetarian') {
          filteredDishes = filteredDishes.filter(dish => dish.isVegetarian);
        } else if (params.dietary === 'non-vegetarian') {
          filteredDishes = filteredDishes.filter(dish => !dish.isVegetarian);
        }
      }
      
      if (params.spicy !== undefined) {
        filteredDishes = filteredDishes.filter(dish => 
          dish.isSpicy === (params.spicy === 'true')
        );
      }
      
      if (params.maxPrice) {
        filteredDishes = filteredDishes.filter(dish => 
          dish.price <= parseFloat(params.maxPrice)
        );
      }
      
      // Sort dishes
      if (params.sortBy) {
        switch (params.sortBy) {
          case 'price_asc':
            filteredDishes.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredDishes.sort((a, b) => b.price - a.price);
            break;
          case 'name':
            filteredDishes.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'restaurant':
            filteredDishes.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName));
            break;
          default:
            filteredDishes.sort((a, b) => a.name.localeCompare(b.name));
        }
      }
      
      return {
        data: {
          dishes: filteredDishes,
          total: filteredDishes.length,
        }
      };
    }
    
    // Handle restaurant by ID
    if (url.startsWith('/api/restaurants/')) {
      const id = url.split('/')[3];
      const restaurant = mockRestaurants.find(r => r.id === id);
      return { data: { restaurant } };
    }
    
    // Handle menu by restaurant ID
    if (url.includes('/menu')) {
      const id = url.split('/')[3];
      const menu = mockMenus[id] || [];
      
      // Apply dietary filters to menu items if specified
      let filteredMenu = menu;
      if (params.dietary) {
        filteredMenu = menu.map(category => ({
          ...category,
          items: category.items.filter(item => {
            if (params.dietary === 'vegetarian') return item.isVegetarian;
            if (params.dietary === 'non-vegetarian') return !item.isVegetarian;
            return true;
          })
        })).filter(category => category.items.length > 0);
      }
      
      return { data: { menu: filteredMenu } };
    }
    
    // Default responses
    const response = mockApiResponses[url];
    if (response) {
      return { data: response };
    }
    
    throw new Error(`Mock API: No response defined for ${url}`);
  },
  
  post: async (url, data) => {
    console.log('Mock API POST request:', { url, data });
    await simulateApiDelay(100);
    
    if (url === '/api/auth/login' || url === '/auth/login') {
      // Simulate login validation
      if (data.email && data.password) {
        // Create user from login data
        const user = {
          id: 'user_' + Date.now(),
          name: data.email.split('@')[0], // Use email prefix as name
          email: data.email,
          phone: '+91 98765 43210', // Default phone
          addresses: [],
          preferences: {
            cuisine: [],
            dietary: 'any',
            spiceLevel: 'medium'
          }
        };
        
        return {
          data: {
            user: user,
            token: 'mock-jwt-token-' + Date.now(),
            message: 'Login successful'
          }
        };
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    if (url === '/api/auth/register' || url === '/auth/register') {
      // Simulate registration - create new user from provided data
      const newUser = {
        id: 'user_' + Date.now(),
        name: data.name || 'New User',
        email: data.email,
        phone: data.phone || '+91 98765 43210',
        addresses: [],
        preferences: {
          cuisine: [],
          dietary: 'any',
          spiceLevel: 'medium'
        }
      };
      
      return {
        data: {
          user: newUser,
          token: 'mock-jwt-token-' + Date.now(),
          message: 'Registration successful'
        }
      };
    }
    
    if (url === '/api/orders') {
      const newOrder = {
        id: 'order' + Date.now(),
        ...data,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      return { data: { order: newOrder } };
    }
    
    throw new Error(`Mock API: No POST handler defined for ${url}`);
  },
  
  put: async (url, data) => {
    await simulateApiDelay(600);
    return { data: { success: true } };
  },
  
  patch: async (url, data) => {
    await simulateApiDelay(600);
    
    if (url.includes('/cancel')) {
      const orderId = url.split('/')[3];
      const order = mockOrders.find(o => o.id === orderId);
      if (order) {
        return {
          data: {
            order: { ...order, status: 'cancelled' }
          }
        };
      }
    }
    
    return { data: { success: true } };
  },
  
  delete: async (url) => {
    await simulateApiDelay(400);
    return { data: { success: true } };
  },
};
