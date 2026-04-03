import React from 'react';
import Button from '../common/Button';
import styles from './BookingCard.module.css';

const BookingCard = ({ booking, type }) => {
  const statusColors = {
    upcoming: '#e67e22',
    completed: '#4caf50',
    cancelled: '#e74c3c'
  };

  return (
    <div className={styles.card}>
      <div className={styles.chefInfo}>
        <div className={styles.avatar}>
          <i className="fas fa-user-chef"></i>
        </div>
        <div>
          <h3>{booking.chefName}</h3>
          <p className={styles.cuisine}>{booking.cuisine}</p>
        </div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.detail}>
          <i className="fas fa-calendar"></i>
          <span>{booking.date}</span>
        </div>
        <div className={styles.detail}>
          <i className="fas fa-clock"></i>
          <span>{booking.time}</span>
        </div>
        <div className={styles.detail}>
          <i className="fas fa-users"></i>
          <span>{booking.guests} guests</span>
        </div>
        <div className={styles.detail}>
          <i className="fas fa-map-marker-alt"></i>
          <span>{booking.location}</span>
        </div>
      </div>
      
      <div className={styles.footer}>
        <span className={styles.status} style={{ background: statusColors[booking.status] }}>
          {booking.status}
        </span>
        {type === 'upcoming' && (
          <div className={styles.actions}>
            <Button variant="outline" size="small">Reschedule</Button>
            <Button variant="secondary" size="small">Cancel</Button>
          </div>
        )}
        {type === 'past' && (
          <Button variant="outline" size="small">Write a Review</Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;