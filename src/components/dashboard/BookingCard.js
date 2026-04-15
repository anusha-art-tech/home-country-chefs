import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import styles from './BookingCard.module.css';

const BookingCard = ({ booking, type, onCancel, review, onDeleteReview }) => {
  const navigate = useNavigate();
  const statusColors = {
    pending: '#e67e22',
    confirmed: '#2e90fa',
    in_progress: '#155eef',
    completed: '#4caf50',
    cancelled: '#e74c3c',
    refunded: '#7a5af8',
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
            <Button variant="secondary" size="small" onClick={onCancel}>Cancel</Button>
          </div>
        )}
        {type === 'past' && (
          <div className={styles.actions}>
            <Button
              variant="outline"
              size="small"
              onClick={() => navigate(review ? `/reviews/${review.id}/edit` : `/reviews/new/${booking.id}`)}
            >
              {review ? 'Edit Review' : 'Write a Review'}
            </Button>
            {review && (
              <Button variant="secondary" size="small" onClick={() => onDeleteReview?.(review.id)}>
                Delete Review
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
