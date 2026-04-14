export const mockChefs = [
  {
    id: 1,
    name: 'Chef Maria Lopez',
    cuisine: 'Mexican',
    rating: 4.9,
    reviews: 128,
    location: 'London, UK',
    experience: 12,
    pricePerService: 120,
    verified: true,
    bio: 'Born and raised in Oaxaca, Mexico, Chef Maria brings authentic family recipes passed down through generations. Her passion is sharing the true flavors of Mexican home cooking.',
    signatureDishes: ['Tacos al Pastor', 'Mole Poblano', 'Chiles En Nogada', 'Tamales'],
    reviewsList: [
      { userName: 'John D.', rating: 5, comment: 'Incredible authentic Mexican food!', date: '2024-01-15' },
      { userName: 'Sarah M.', rating: 5, comment: 'Best tacos I\'ve had outside of Mexico', date: '2024-01-10' }
    ]
  },
  // Add more chefs as needed
];

export const mockBookings = [
  {
    id: 1,
    chefId: 1,
    chefName: 'Chef Maria Lopez',
    cuisine: 'Mexican',
    date: '2024-02-20',
    time: '6:00 PM',
    guests: 4,
    location: 'London, UK',
    status: 'upcoming'
  },
  {
    id: 2,
    chefId: 2,
    chefName: 'Chef Rajesh Kumar',
    cuisine: 'Indian',
    date: '2024-02-15',
    time: '7:00 PM',
    guests: 6,
    location: 'Birmingham, UK',
    status: 'completed'
  }
];
