import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';
import { chefsAPI } from '../../services/api';
import { normalizeChef } from '../../utils/helpers';
import styles from './PopularChefs.module.css';

const PopularChefs = () => {
  const navigate = useNavigate();
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await chefsAPI.getTop(4);
        setChefs(response.data.data.map(normalizeChef));
      } catch (error) {
        setChefs([]);
      }
    };

    fetchChefs();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Popular Home-Country Chefs</h2>
          <p className={styles.subtitle}>Discover our most beloved chefs bringing authentic flavors to your table</p>
        </div>
        <div className={styles.grid}>
          {chefs.map(chef => (
            <Card key={chef.id} hoverable className={styles.chefCard}>
              <div className={styles.imageWrapper}>
                <div className={styles.placeholderImage}>
                  <i className="fas fa-user-chef"></i>
                </div>
              </div>
              <div className={styles.chefInfo}>
                <h3 className={styles.chefName}>{chef.name}</h3>
                <p className={styles.chefCuisine}>{chef.cuisine} Cuisine</p>
                <div className={styles.rating}>
                  <i className="fas fa-star"></i>
                  <span>{chef.rating}</span>
                  <span className={styles.reviews}>({chef.reviews} reviews)</span>
                </div>
                <Button fullWidth onClick={() => navigate(`/chef/${chef.id}`)}>
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className={styles.viewAll}>
          <Button variant="secondary" onClick={() => navigate('/chefs')}>
            View All Chefs
            <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularChefs;
