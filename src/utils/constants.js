export const CUISINES = [
  'British', 'Italian', 'Indian', 'Chinese', 'Mexican', 'Japanese', 
  'Thai', 'French', 'Spanish', 'Middle Eastern', 'Greek',
  'Vietnamese', 'Korean', 'Moroccan', 'Turkish', 'Brazilian'
];

export const PRICE_RANGES = [
  { label: '£50-100', min: 50, max: 100 },
  { label: '£100-150', min: 100, max: 150 },
  { label: '£150-200', min: 150, max: 200 },
  { label: '£200+', min: 200, max: Infinity }
];

export const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', 
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
];

export const API_ENDPOINTS = {
  CHEFS: '/api/chefs',
  BOOKINGS: '/api/bookings',
  AUTH: '/api/auth',
  REVIEWS: '/api/reviews'
};
