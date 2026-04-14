import React, { useEffect, useState } from 'react';
import styles from './ChefFilters.module.css';

const cuisines = ['All', 'British', 'Italian', 'Indian', 'Chinese', 'Mexican', 'Japanese', 'Thai', 'French', 'Spanish', 'Middle Eastern'];
const priceRanges = ['All', '£50-100', '£100-150', '£150-200', '£200+'];
const ratings = ['All', '4.5+', '4.0+', '3.5+'];

const ChefFilters = ({ onFilterChange }) => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        cuisine: selectedCuisine,
        priceRange: selectedPrice,
        rating: selectedRating,
        search: searchTerm,
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCuisine, selectedPrice, selectedRating, searchTerm, onFilterChange]);

  return (
    <div className={styles.filters}>
      <div className={styles.searchBar}>
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search by chef name or cuisine..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      
      <div className={styles.filterGroup}>
        <label>Cuisine</label>
        <div className={styles.filterOptions}>
          {cuisines.map(cuisine => (
            <button
              key={cuisine}
              type="button"
              className={`${styles.filterBtn} ${selectedCuisine === cuisine ? styles.active : ''}`}
              onClick={() => setSelectedCuisine(cuisine)}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.filterGroup}>
        <label>Price Range</label>
        <div className={styles.filterOptions}>
          {priceRanges.map(price => (
            <button
              key={price}
              type="button"
              className={`${styles.filterBtn} ${selectedPrice === price ? styles.active : ''}`}
              onClick={() => setSelectedPrice(price)}
            >
              {price}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.filterGroup}>
        <label>Rating</label>
        <div className={styles.filterOptions}>
          {ratings.map(rating => (
            <button
              key={rating}
              type="button"
              className={`${styles.filterBtn} ${selectedRating === rating ? styles.active : ''}`}
              onClick={() => setSelectedRating(rating)}
            >
              {rating} {rating !== 'All' && <i className="fas fa-star"></i>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefFilters;
