import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ChefGrid from '../components/chefs/ChefGrid';
import { useAuth } from '../hooks/useAuth';
import { usersAPI } from '../services/api';
import { normalizeChef } from '../utils/helpers';
import styles from './ChefsPage.module.css';

const FavoritesPage = () => {
  const { user } = useAuth();
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favoriteBusyIds, setFavoriteBusyIds] = useState(new Set());

  useEffect(() => {
    if (user?.role !== 'customer') return;

    const fetchFavorites = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await usersAPI.getFavorites();
        setChefs((response.data.data || []).map(normalizeChef));
      } catch (apiError) {
        setError(apiError.response?.data?.message || 'Unable to load favorite chefs right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user?.role]);

  if (user?.role !== 'customer') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleToggleFavorite = async (chef) => {
    setFavoriteBusyIds((current) => new Set([...current, chef.id]));

    try {
      await usersAPI.removeFavorite(chef.id);
      setChefs((current) => current.filter((item) => item.id !== chef.id));
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to update favorites right now.');
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
        <h1>My Favourites</h1>
        <p>Chefs you have saved for later</p>
      </div>
      <div className={styles.container}>
        {error && <p style={{ color: '#b3261e' }}>{error}</p>}
        <ChefGrid
          chefs={chefs}
          loading={loading}
          favoriteChefIds={new Set(chefs.map((chef) => chef.id))}
          favoriteBusyIds={favoriteBusyIds}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
};

export default FavoritesPage;
