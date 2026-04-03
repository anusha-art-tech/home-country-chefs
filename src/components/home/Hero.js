import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import styles from './Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Taste <span className={styles.highlight}>Home</span>, Wherever You Are
          </h1>
          <p className={styles.subtitle}>
            Connect with authentic home-country chefs who bring your cultural cuisine 
            straight to your kitchen. Experience the true taste of tradition.
          </p>
          <div className={styles.buttons}>
            <Button size="large" onClick={() => navigate('/chefs')}>
              Find Your Chef
              <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
            </Button>
            <Button variant="secondary" size="large" onClick={() => navigate('/about')}>
              Learn More
            </Button>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Authentic Chefs</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Cuisines</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10k+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.imagePlaceholder}>
            <i className="fas fa-utensils" style={{ fontSize: '80px', color: '#e67e22' }}></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;