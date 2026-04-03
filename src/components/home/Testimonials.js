import React, { useState } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  { id: 1, name: 'Priya Sharma', location: 'London, UK', rating: 5, comment: 'Found an amazing Indian chef who made the most authentic biryani I\'ve had since leaving home. Highly recommend!', chef: 'Chef Rajesh' },
  { id: 2, name: 'Marco Chen', location: 'Toronto, Canada', rating: 5, comment: 'The Italian chef was incredible. Made fresh pasta just like my grandmother used to make. Will definitely book again.', chef: 'Chef Giovanni' },
  { id: 3, name: 'Sarah Johnson', location: 'Sydney, Australia', rating: 4, comment: 'Great platform! Found a Mexican chef for my dinner party and everyone loved the authentic tacos and mole.', chef: 'Chef Maria' }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[currentIndex];

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>What Our Customers Say</h2>
          <p>Real experiences from food lovers around the world</p>
        </div>
        
        <div className={styles.carousel}>
          <button onClick={prevTestimonial} className={styles.navBtn}>
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className={styles.testimonial}>
            <div className={styles.quoteIcon}>
              <i className="fas fa-quote-left"></i>
            </div>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star ${i < t.rating ? styles.filled : ''}`}></i>
              ))}
            </div>
            <p className={styles.comment}>"{t.comment}"</p>
            <div className={styles.author}>
              <strong>{t.name}</strong>
              <span>{t.location}</span>
              <small>Booked: {t.chef}</small>
            </div>
          </div>
          
          <button onClick={nextTestimonial} className={styles.navBtn}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;