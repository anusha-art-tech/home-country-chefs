import React, { useCallback, useEffect, useState } from 'react';
import ChefFilters from '../components/chefs/ChefFilters';
import ChefGrid from '../components/chefs/ChefGrid';
import { chefsAPI } from '../services/api';
import { normalizeChef } from '../utils/helpers';
import styles from './ChefsPage.module.css';

const ChefsPage = () => {
  const [filters, setFilters] = useState({});
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChefs = async () => {
      setLoading(true);
      setError('');

      try {
        const params = {};
        if (filters.cuisine && filters.cuisine !== 'All') params.cuisine = filters.cuisine;
        if (filters.search) params.search = filters.search;
        if (filters.rating && filters.rating !== 'All') params.minRating = filters.rating;
        if (filters.priceRange && filters.priceRange !== 'All' && filters.priceRange !== '£200+') {
          const [min, max] = filters.priceRange.replace(/£/g, '').split('-');
          params.minPrice = min;
          params.maxPrice = max;
        }
        if (filters.priceRange === '£200+') {
          params.minPrice = 200;
          params.maxPrice = 1000;
        }

        const response = await chefsAPI.getAll(params);
        setChefs(response.data.data.map(normalizeChef));
      } catch (apiError) {
        setError(apiError.response?.data?.message || 'Unable to load chefs right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, [filters]);

  const handleFilterChange = useCallback((nextFilters) => {
    setFilters((currentFilters) => {
      const currentValue = JSON.stringify(currentFilters);
      const nextValue = JSON.stringify(nextFilters);
      return currentValue === nextValue ? currentFilters : nextFilters;
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Find Your Perfect Chef</h1>
        <p>Discover authentic home-country chefs from around the world</p>
      </div>
      <div className={styles.container}>
        <ChefFilters onFilterChange={handleFilterChange} />
        {error && <p style={{ color: '#b3261e' }}>{error}</p>}
        <ChefGrid chefs={chefs} loading={loading} />
      </div>
    </div>
  );
};

export default ChefsPage;
