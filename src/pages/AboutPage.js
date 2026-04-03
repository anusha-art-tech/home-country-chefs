import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Our Story</h1>
        <p>Connecting cultures through authentic home cooking</p>
      </div>
      
      <div className={styles.container}>
        <div className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            At Origin Foods, we believe that food is more than just sustenance—it's a connection to home, 
            culture, and memories. Our mission is to bridge the gap between diaspora communities and 
            authentic home-country cooking, making traditional meals accessible to everyone, everywhere.
          </p>
        </div>
        
        <div className={styles.section}>
          <h2>What Makes Us Different</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <i className="fas fa-heart"></i>
              <h3>Authenticity First</h3>
              <p>We prioritize genuine home-style recipes passed down through generations.</p>
            </div>
            <div className={styles.feature}>
              <i className="fas fa-shield-alt"></i>
              <h3>Verified Chefs</h3>
              <p>Every chef undergoes thorough background and culinary verification.</p>
            </div>
            <div className={styles.feature}>
              <i className="fas fa-globe"></i>
              <h3>Global Community</h3>
              <p>Connect with chefs from over 50 countries and diverse cultural backgrounds.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.section}>
          <h2>Our Values</h2>
          <div className={styles.values}>
            <div className={styles.value}>
              <strong>Cultural Respect</strong>
              <p>We honor and celebrate culinary traditions from around the world.</p>
            </div>
            <div className={styles.value}>
              <strong>Quality Assurance</strong>
              <p>We maintain high standards for food safety and service quality.</p>
            </div>
            <div className={styles.value}>
              <strong>Community Support</strong>
              <p>We create economic opportunities for skilled home chefs globally.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;