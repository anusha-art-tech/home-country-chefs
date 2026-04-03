import React from 'react';
import Button from '../common/Button';
import styles from './ChefProfile.module.css';

const ChefProfile = ({ chef, onBook }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <i className="fas fa-user-chef"></i>
        </div>
        <div className={styles.info}>
          <h1>{chef.name}</h1>
          <p className={styles.cuisine}>{chef.cuisine} Cuisine</p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <i className="fas fa-star"></i>
              <span>{chef.rating}</span>
              <small>({chef.reviews} reviews)</small>
            </div>
            <div className={styles.stat}>
              <i className="fas fa-map-marker-alt"></i>
              <span>{chef.location}</span>
            </div>
            <div className={styles.stat}>
              <i className="fas fa-clock"></i>
              <span>{chef.experience} years experience</span>
            </div>
          </div>
        </div>
        <Button size="large" onClick={onBook}>
          Book This Chef
        </Button>
      </div>
      
      <div className={styles.bio}>
        <h3>About Chef {chef.name.split(' ')[1]}</h3>
        <p>{chef.bio}</p>
      </div>
      
      <div className={styles.specialties}>
        <h3>Signature Dishes</h3>
        <div className={styles.dishesList}>
          {chef.signatureDishes?.map((dish, index) => (
            <div key={index} className={styles.dish}>
              <i className="fas fa-utensil-spoon"></i>
              <span>{dish}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.reviews}>
        <h3>Customer Reviews</h3>
        {chef.reviewsList?.map((review, index) => (
          <div key={index} className={styles.review}>
            <div className={styles.reviewHeader}>
              <strong>{review.userName}</strong>
              <div className={styles.reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < review.rating ? styles.filled : ''}`}></i>
                ))}
              </div>
            </div>
            <p>{review.comment}</p>
            <small>{review.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefProfile;