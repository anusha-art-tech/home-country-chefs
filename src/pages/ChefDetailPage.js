import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChefProfile from '../components/chefs/ChefProfile';
import { mockChefs } from '../services/mockData';
import styles from './ChefDetailPage.module.css';

const ChefDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);

  useEffect(() => {
    const foundChef = mockChefs.find(c => c.id === parseInt(id));
    if (foundChef) {
      setChef(foundChef);
    }
  }, [id]);

  const handleBook = () => {
    navigate(`/booking/${id}`);
  };

  if (!chef) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <ChefProfile chef={chef} onBook={handleBook} />
    </div>
  );
};

export default ChefDetailPage;