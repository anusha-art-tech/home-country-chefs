import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import styles from './CtaSection.module.css';

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2>Ready to Taste Home Again?</h2>
        <p>
          Join thousands of food lovers who have discovered authentic home-country 
          cooking through Origin Foods. Find your perfect chef today.
        </p>
        <div className={styles.buttons}>
          <Button size="large" onClick={() => navigate('/chefs')}>
            Find a Chef
          </Button>
          <Button variant="outline" size="large" onClick={() => navigate('/register')}>
            Become a Chef
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;