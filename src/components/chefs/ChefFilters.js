import React, { useState } from 'react';
import styles from './ChefFilters.module.css';

const cuisines = ['All', 'Italian', 'Indian', 'Chinese', 'Mexican', 'Japanese', 'Thai', 'French', 'Spanish', 'Middle Eastern'];
const priceRanges = ['All', '$50-100', '$100-150', '$150-200', '$200+'];
const ratings = ['All', '4.5+', '4.0+', '3.5+'];

const ChefFilters = ({ onFilterChange }) => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      cuisine: selectedCuisine,
      priceRange: selectedPrice,
      rating: selectedRating,
      search: searchTerm
    });
  };

  const updateCuisine = (cuisine) => {
    setSelectedCuisine(cuisine);
    setTimeout(handleFilterChange, 0);
  };

  const updatePrice = (price) => {
    setSelectedPrice(price);
    setTimeout(handleFilterChange, 0);
  };

  const updateRating = (rating) => {
    setSelectedRating(rating);
    setTimeout(handleFilterChange, 0);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setTimeout(handleFilterChange, 300);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.searchBar}>
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search by chef name or cuisine..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className={styles.filterGroup}>
        <label>Cuisine</label>
        <div className={styles.filterOptions}>
          {cuisines.map(cuisine => (
            <button
              key={cuisine}
              className={`${styles.filterBtn} ${selectedCuisine === cuisine ? styles.active : ''}`}
              onClick={() => updateCuisine(cuisine)}
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
              className={`${styles.filterBtn} ${selectedPrice === price ? styles.active : ''}`}
              onClick={() => updatePrice(price)}
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
              className={`${styles.filterBtn} ${selectedRating === rating ? styles.active : ''}`}
              onClick={() => updateRating(rating)}
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