import React, { useState } from 'react';
import ChefFilters from '../components/chefs/ChefFilters';
import ChefGrid from '../components/chefs/ChefGrid';
import styles from './ChefsPage.module.css';

const mockChefs = [
  { id: 1, name: 'Chef Maria Lopez', cuisine: 'Mexican', rating: 4.9, reviews: 128, location: 'Los Angeles, CA', experience: 12, pricePerService: 150, verified: true, bio: 'Authentic Mexican cuisine from Oaxaca', signatureDishes: ['Tacos al Pastor', 'Mole Poblano', 'Chiles En Nogada'] },
  { id: 2, name: 'Chef Rajesh Kumar', cuisine: 'Indian', rating: 4.8, reviews: 95, location: 'New York, NY', experience: 15, pricePerService: 160, verified: true, bio: 'Traditional North Indian cooking', signatureDishes: ['Butter Chicken', 'Biryani', 'Dal Makhani'] },
  { id: 3, name: 'Chef Wei Zhang', cuisine: 'Chinese', rating: 4.9, reviews: 156, location: 'San Francisco, CA', experience: 10, pricePerService: 140, verified: true, bio: 'Sichuan and Cantonese specialties', signatureDishes: ['Kung Pao Chicken', 'Dim Sum', 'Mapo Tofu'] },
  { id: 4, name: 'Chef Giovanni Rossi', cuisine: 'Italian', rating: 5.0, reviews: 203, location: 'Chicago, IL', experience: 20, pricePerService: 180, verified: true, bio: 'Authentic Italian from Tuscany', signatureDishes: ['Fresh Pasta', 'Risotto', 'Tiramisu'] },
  { id: 5, name: 'Chef Yuki Tanaka', cuisine: 'Japanese', rating: 4.9, reviews: 87, location: 'Seattle, WA', experience: 8, pricePerService: 170, verified: false, bio: 'Traditional Japanese home cooking', signatureDishes: ['Sushi', 'Ramen', 'Tempura'] },
  { id: 6, name: 'Chef Amira Hassan', cuisine: 'Middle Eastern', rating: 4.7, reviews: 64, location: 'Detroit, MI', experience: 9, pricePerService: 145, verified: true, bio: 'Lebanese and Syrian cuisine', signatureDishes: ['Hummus', 'Falafel', 'Shawarma'] }
];

const ChefsPage = () => {
  const [chefs] = useState(mockChefs);
  const [filteredChefs, setFilteredChefs] = useState(mockChefs);
  const [loading] = useState(false);

  const handleFilterChange = (filters) => {
    let filtered = [...chefs];
    
    if (filters.cuisine && filters.cuisine !== 'All') {
      filtered = filtered.filter(chef => chef.cuisine === filters.cuisine);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(chef => 
        chef.name.toLowerCase().includes(searchLower) || 
        chef.cuisine.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.priceRange && filters.priceRange !== 'All') {
      const [min, max] = filters.priceRange.replace('$', '').split('-');
      if (max) {
        filtered = filtered.filter(chef => chef.pricePerService >= parseInt(min) && chef.pricePerService <= parseInt(max));
      } else if (filters.priceRange === '$200+') {
        filtered = filtered.filter(chef => chef.pricePerService >= 200);
      }
    }
    
    if (filters.rating && filters.rating !== 'All') {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(chef => chef.rating >= minRating);
    }
    
    setFilteredChefs(filtered);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Find Your Perfect Chef</h1>
        <p>Discover authentic home-country chefs from around the world</p>
      </div>
      <div className={styles.container}>
        <ChefFilters onFilterChange={handleFilterChange} />
        <ChefGrid chefs={filteredChefs} loading={loading} />
      </div>
    </div>
  );
};

export default ChefsPage;
