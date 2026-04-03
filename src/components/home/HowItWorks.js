import React from 'react';
import styles from './HowItWorks.module.css';

const steps = [
  { icon: 'fa-search', title: 'Find Your Chef', description: 'Browse through our curated list of authentic home-country chefs' },
  { icon: 'fa-calendar-alt', title: 'Book a Session', description: 'Choose a date and time that works for you' },
  { icon: 'fa-utensils', title: 'Enjoy the Meal', description: 'Your chef cooks authentic traditional food in your kitchen' },
  { icon: 'fa-star', title: 'Rate & Review', description: 'Share your experience and help others find great chefs' }
];

const HowItWorks = () => {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>How It Works</h2>
          <p>Get authentic home-cooked meals in four simple steps</p>
        </div>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.iconWrapper}>
                <i className={`fas ${step.icon}`}></i>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;