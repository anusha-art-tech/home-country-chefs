import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChefProfile from '../components/chefs/ChefProfile';
import { chefsAPI } from '../services/api';
import { normalizeChef } from '../utils/helpers';
import styles from './ChefDetailPage.module.css';

const ChefDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);
  const [error, setError] = useState('');

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

  const handleBook = () => {
    navigate(`/booking/${id}`);
  };

  if (!chef) {
    return <div className={styles.loading}>{error || 'Loading...'}</div>;
  }

  return (
    <div className={styles.page}>
      <ChefProfile chef={chef} onBook={handleBook} />
    </div>
  );
};

export default ChefDetailPage;
