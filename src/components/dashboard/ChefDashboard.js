import React from 'react';
import { formatPrice, upcomingStatuses } from '../../utils/helpers';
import styles from './ChefDashboard.module.css';

const ChefDashboard = ({ chef, bookings, onBookingAction }) => {
  const upcomingBookings = bookings?.filter((booking) => upcomingStatuses.includes(booking.status)) || [];
  const stats = {
    totalBookings: bookings?.length || 0,
    completedBookings: bookings?.filter(b => b.status === 'completed').length || 0,
    averageRating: chef?.rating || 0,
    totalEarnings: bookings?.reduce((sum, b) => sum + Number(b.chefEarnings || 0), 0) || 0
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Chef Dashboard</h1>
        <p>Welcome back, {chef?.name}</p>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.stat}>
          <i className="fas fa-calendar-check"></i>
          <div>
            <h3>{stats.totalBookings}</h3>
            <span>Total Bookings</span>
          </div>
        </div>
        <div className={styles.stat}>
          <i className="fas fa-check-circle"></i>
          <div>
            <h3>{stats.completedBookings}</h3>
            <span>Completed</span>
          </div>
        </div>
        <div className={styles.stat}>
          <i className="fas fa-star"></i>
          <div>
            <h3>{stats.averageRating}</h3>
            <span>Rating</span>
          </div>
        </div>
        <div className={styles.stat}>
          <i className="fas fa-pound-sign"></i>
          <div>
            <h3>{formatPrice(stats.totalEarnings)}</h3>
            <span>Total Earnings</span>
          </div>
        </div>
      </div>
      
      <div className={styles.section}>
        <h3>Upcoming Bookings</h3>
        <div className={styles.bookingsList}>
          {upcomingBookings.map(booking => (
            <div key={booking.id} className={styles.bookingItem}>
              <div className={styles.bookingInfo}>
                <strong>{booking.customerName}</strong>
                <span>{booking.date} at {booking.time}</span>
                <span>{booking.guests} guests</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {booking.status === 'pending' && (
                  <button className={styles.confirmBtn} onClick={() => onBookingAction?.(booking.id, 'confirmed')}>
                    Confirm
                  </button>
                )}
                {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                  <button className={styles.confirmBtn} onClick={() => onBookingAction?.(booking.id, 'completed')}>
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
          {upcomingBookings.length === 0 && (
            <p className={styles.empty}>No upcoming bookings</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
