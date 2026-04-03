import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import PopularChefs from '../components/home/PopularChefs';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CtaSection from '../components/home/CtaSection';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Hero />
      <Features />
      <PopularChefs />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </div>
  );
};

export default HomePage;