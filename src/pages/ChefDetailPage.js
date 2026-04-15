import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChefProfile from '../components/chefs/ChefProfile';
import { useAuth } from '../hooks/useAuth';
import { chefsAPI, usersAPI } from '../services/api';
import { normalizeChef } from '../utils/helpers';
import styles from './ChefDetailPage.module.css';

const ChefDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [chef, setChef] = useState(null);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const response = await chefsAPI.getById(id);
        setChef(normalizeChef(response.data.data));
      } catch (apiError) {
        setError(apiError.response?.data?.message || 'Unable to load chef profile.');
      }
    };

    fetchChef();
  }, [id]);

  useEffect(() => {
    if (user?.role !== 'customer') {
      setIsFavorite(false);
      return;
    }

    const loadFavorites = async () => {
      try {
        const response = await usersAPI.getFavorites();
        setIsFavorite((response.data.data || []).some((item) => Number(item.id) === Number(id)));
      } catch (_error) {
        setIsFavorite(false);
      }
    };

    loadFavorites();
  }, [id, user?.role]);

  const handleBook = () => {
    navigate(`/booking/${id}`);
  };

  const handleToggleFavorite = async () => {
    if (!chef || user?.role !== 'customer') return;

    setFavoriteLoading(true);

    try {
      if (isFavorite) {
        await usersAPI.removeFavorite(chef.id);
        setIsFavorite(false);
      } else {
        await usersAPI.addFavorite(chef.id);
        setIsFavorite(true);
      }
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (!chef) {
    return <div className={styles.loading}>{error || 'Loading...'}</div>;
  }

  return (
    <div className={styles.page}>
      <ChefProfile
        chef={chef}
        onBook={handleBook}
        isFavorite={isFavorite}
        onToggleFavorite={user?.role === 'customer' ? handleToggleFavorite : undefined}
        favoriteDisabled={favoriteLoading}
      />
    </div>
  );
};

export default ChefDetailPage;
