import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';
import styles from './PopularChefs.module.css';

const chefs = [
  { id: 1, name: 'Chef Maria Lopez', cuisine: 'Mexican', rating: 4.9, reviews: 128, image: null },
  { id: 2, name: 'Chef Rajesh Kumar', cuisine: 'Indian', rating: 4.8, reviews: 95, image: null },
  { id: 3, name: 'Chef Wei Zhang', cuisine: 'Chinese', rating: 4.9, reviews: 156, image: null },
  { id: 4, name: 'Chef Giovanni Rossi', cuisine: 'Italian', rating: 5.0, reviews: 203, image: null }
];

const PopularChefs = () => {
  const navigate = useNavigate();

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