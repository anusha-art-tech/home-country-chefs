export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(Number(price || 0));
};

export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const upcomingStatuses = ['pending', 'confirmed', 'in_progress'];

export const normalizeChef = (chef) => {
  if (!chef) return null;
  const reviewItems = Array.isArray(chef.reviews) ? chef.reviews : [];
  const cuisines = Array.isArray(chef.Cuisines) ? chef.Cuisines : [];

  return {
    ...chef,
    verified: chef.isVerified,
    reviewItems,
    reviews: chef.totalReviews ?? reviewItems.length ?? 0,
    location: [chef.city, chef.state].filter(Boolean).join(', '),
    displayName: chef.name || chef.user?.name || 'Chef',
    cuisines,
    cuisineNames: cuisines.map((item) => item.name).filter(Boolean),
  };
};

export const normalizeBooking = (booking) => {
  if (!booking) return null;

  return {
    ...booking,
    customerName: booking.user?.name || booking.customerName || 'Customer',
    chefName: booking.chefName || booking.chef?.name || 'Chef',
    location: [booking.address, booking.city, booking.state].filter(Boolean).join(', '),
  };
};

export const getRoleLabel = (role) => {
  if (role === 'customer') return 'Customer';
  if (role === 'chef') return 'Chef';
  if (role === 'admin') return 'Admin';
  return role;
};
