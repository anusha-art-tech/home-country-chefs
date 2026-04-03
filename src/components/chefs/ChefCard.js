import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './ChefCard.module.css';

const ChefCard = ({ chef }) => {
  const navigate = useNavigate();

  return (
    <Card hoverable className={styles.chefCard}>
      <div className={styles.imageContainer}>
        <div className={styles.chefImage}>
          <i className="fas fa-user-chef"></i>
        </div>
        {chef.verified && (
          <span className={styles.verifiedBadge}>
            <i className="fas fa-check-circle"></i> Verified
          </span>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{chef.name}</h3>
        <p className={styles.cuisine}>{chef.cuisine} Cuisine</p>
        
        <div className={styles.rating}>
          <div className={styles.stars}>
            <i className="fas fa-star"></i>
            <span>{chef.rating}</span>
          </div>
          <span className={styles.reviews}>({chef.reviews} reviews)</span>
        </div>
        
        <div className={styles.details}>
          <div className={styles.detail}>
            <i className="fas fa-map-marker-alt"></i>
            <span>{chef.location}</span>
          </div>
          <div className={styles.detail}>
            <i className="fas fa-utensils"></i>
            <span>{chef.experience} years exp</span>
          </div>
        </div>
        
        <div className={styles.price}>
          <span className={styles.priceAmount}>${chef.pricePerService}</span>
          <span className={styles.priceLabel}>/ per service</span>
        </div>
        
        <Button fullWidth onClick={() => navigate(`/chef/${chef.id}`)}>
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default ChefCard;