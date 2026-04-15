import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to={isAuthenticated ? "/dashboard" : "/"} className={styles.logo}>
          <span className={styles.logoIcon}>🍜</span>
          <span className={styles.logoText}>Origin Foods</span>
        </Link>

        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
              {user?.role !== 'chef' && <Link to="/chefs" className={styles.navLink}>Find Chefs</Link>}
              {user?.role === 'customer' && <Link to="/favorites" className={styles.navLink}>Favourites</Link>}
              <Link to="/profile" className={styles.navLink}>Profile</Link>
              {user?.role === 'chef' && <Link to="/cuisines" className={styles.navLink}>Cuisines</Link>}
              <Button variant="outline" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/" className={styles.navLink}>Home</Link>
              <Link to="/chefs" className={styles.navLink}>Find Chefs</Link>
              <Link to="/about" className={styles.navLink}>About</Link>
              <Link to="/contact" className={styles.navLink}>Contact</Link>
              <Button variant="secondary" size="small" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="primary" size="small" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
