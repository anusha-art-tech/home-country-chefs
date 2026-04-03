import React from 'react';
import styles from './BookingSummary.module.css';

const BookingSummary = ({ chef, bookingDetails }) => {
  const calculateTotal = () => {
    const basePrice = chef?.pricePerService || 150;
    const guestFee = (bookingDetails?.guests || 2) * 10;
    const serviceFee = basePrice * 0.1;
    return basePrice + guestFee + serviceFee;
  };

  return (
    <div className={styles.summary}>
      <h3>Booking Summary</h3>
      
      <div className={styles.chefInfo}>
        <div className={styles.chefAvatar}>
          <i className="fas fa-user-chef"></i>
        </div>
        <div>
          <h4>{chef?.name}</h4>
          <p className={styles.cuisine}>{chef?.cuisine} Cuisine</p>
          <div className={styles.rating}>
            <i className="fas fa-star"></i>
            <span>{chef?.rating}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.row}>
          <span>Date & Time</span>
          <strong>
            {bookingDetails?.date} at {bookingDetails?.time}
          </strong>
        </div>
        
        <div className={styles.row}>
          <span>Number of Guests</span>
          <strong>{bookingDetails?.guests} guests</strong>
        </div>
        
        <div className={styles.row}>
          <span>Location</span>
          <strong>{bookingDetails?.address}, {bookingDetails?.city}</strong>
        </div>
      </div>
      
      <div className={styles.pricing}>
        <div className={styles.row}>
          <span>Cooking Service</span>
          <span>${chef?.pricePerService || 150}</span>
        </div>
        <div className={styles.row}>
          <span>Additional Guests (${(bookingDetails?.guests || 2) * 10})</span>
          <span>${(bookingDetails?.guests || 2) * 10}</span>
        </div>
        <div className={styles.row}>
          <span>Service Fee</span>
          <span>${((chef?.pricePerService || 150) * 0.1).toFixed(2)}</span>
        </div>
        <div className={`${styles.row} ${styles.total}`}>
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
      
      <div className={styles.note}>
        <i className="fas fa-info-circle"></i>
        <p>Payment will be processed securely. You can cancel up to 24 hours before the booking.</p>
      </div>
    </div>
  );
};

export default BookingSummary;