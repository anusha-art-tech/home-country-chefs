import React, { useCallback, useEffect, useState } from 'react';
import ChefFilters from '../components/chefs/ChefFilters';
import ChefGrid from '../components/chefs/ChefGrid';
import { useAuth } from '../hooks/useAuth';
import { chefsAPI, usersAPI } from '../services/api';
import { normalizeChef } from '../utils/helpers';
import styles from './ChefsPage.module.css';

const ChefsPage = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({});
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favoriteChefIds, setFavoriteChefIds] = useState(new Set());
  const [favoriteBusyIds, setFavoriteBusyIds] = useState(new Set());

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

  useEffect(() => {
    if (user?.role !== 'customer') {
      setFavoriteChefIds(new Set());
      return;
    }

    const loadFavorites = async () => {
      try {
        const response = await usersAPI.getFavorites();
        setFavoriteChefIds(new Set((response.data.data || []).map((chef) => Number(chef.id))));
      } catch (_error) {
        setFavoriteChefIds(new Set());
      }
    };

    loadFavorites();
  }, [user?.role]);

  const handleFilterChange = useCallback((nextFilters) => {
    setFilters((currentFilters) => {
      const currentValue = JSON.stringify(currentFilters);
      const nextValue = JSON.stringify(nextFilters);
      return currentValue === nextValue ? currentFilters : nextFilters;
    });
  }, []);

  const handleToggleFavorite = async (chef) => {
    if (user?.role !== 'customer') return;

    setFavoriteBusyIds((current) => new Set([...current, chef.id]));

    try {
      if (favoriteChefIds.has(chef.id)) {
        await usersAPI.removeFavorite(chef.id);
        setFavoriteChefIds((current) => {
          const next = new Set(current);
          next.delete(chef.id);
          return next;
        });
      } else {
        await usersAPI.addFavorite(chef.id);
        setFavoriteChefIds((current) => new Set([...current, chef.id]));
      }
    } finally {
      setFavoriteBusyIds((current) => {
        const next = new Set(current);
        next.delete(chef.id);
        return next;
      });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Find Your Perfect Chef</h1>
        <p>Discover authentic home-country chefs from around the world</p>
      </div>
      <div className={styles.container}>
        <ChefFilters onFilterChange={handleFilterChange} />
        {error && <p style={{ color: '#b3261e' }}>{error}</p>}
        <ChefGrid
          chefs={chefs}
          loading={loading}
          favoriteChefIds={favoriteChefIds}
          favoriteBusyIds={favoriteBusyIds}
          onToggleFavorite={user?.role === 'customer' ? handleToggleFavorite : undefined}
        />
      </div>
    </div>
  );
};

export default ChefsPage;
