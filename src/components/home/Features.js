import React from 'react';
import Card from '../common/Card';
import styles from './Features.module.css';

const features = [
  { icon: 'fa-home', title: 'Home-Style Cooking', description: 'Experience authentic recipes passed down through generations, cooked in your own kitchen.' },
  { icon: 'fa-check-circle', title: 'Verified Chefs', description: 'All chefs undergo background verification and culinary authenticity checks.' },
  { icon: 'fa-calendar-alt', title: 'Flexible Booking', description: 'Schedule cooking sessions at your convenience, from daily meals to special events.' },
  { icon: 'fa-star', title: 'Quality Guaranteed', description: 'Rate and review chefs to ensure the highest quality standards.' },
  { icon: 'fa-globe', title: 'Global Cuisine', description: 'Access authentic chefs from over 50 countries and diverse cultural backgrounds.' },
  { icon: 'fa-shield-alt', title: 'Safe & Secure', description: 'Secure payments and insurance coverage for peace of mind.' }
];

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Why Choose Us</span>
          <h2 className={styles.title}>Experience Authenticity Like Never Before</h2>
          <p className={styles.subtitle}>
            We connect you with passionate chefs who bring your cultural heritage to life through food.
          </p>
        </div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <Card key={index} hoverable className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;