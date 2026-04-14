import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>🍜 Origin Foods</h3>
            <p className={styles.description}>
              Bringing authentic home-country cooking to your table, wherever you are in the world.
            </p>
            <div className={styles.social}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className={styles.links}>
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/chefs">Find Chefs</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className={styles.links}>
            <h4>Support</h4>
            <Link to="/contact">Help Center</Link>
            <Link to="/about">Safety Guide</Link>
            <Link to="/about">Terms of Service</Link>
            <Link to="/about">Privacy Policy</Link>
          </div>
          <div className={styles.contact}>
            <h4>Contact Us</h4>
            <p><i className="fas fa-envelope"></i> support@originfoods.co.uk</p>
            <p><i className="fas fa-phone"></i> +44 20 7946 0958</p>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; 2024 Origin Foods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
