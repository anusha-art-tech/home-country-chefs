import React, { useState } from 'react';
import BookingCard from './BookingCard';
import styles from './UserDashboard.module.css';

const UserDashboard = ({ user, bookings }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingBookings = bookings?.filter(b => b.status === 'upcoming') || [];
  const pastBookings = bookings?.filter(b => b.status === 'completed') || [];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>My Dashboard</h1>
        <p>Welcome back, {user?.name}</p>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.stat}>
          <i className="fas fa-calendar-check"></i>
          <div>
            <h3>{upcomingBookings.length}</h3>
            <span>Upcoming Bookings</span>
          </div>
        </div>
        <div className={styles.stat}>
          <i className="fas fa-check-circle"></i>
          <div>
            <h3>{pastBookings.length}</h3>
            <span>Completed Bookings</span>
          </div>
        </div>
        <div className={styles.stat}>
          <i className="fas fa-heart"></i>
          <div>
            <h3>12</h3>
            <span>Favorite Chefs</span>
          </div>
        </div>
      </div>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'upcoming' ? styles.active : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'past' ? styles.active : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Bookings
        </button>
      </div>
      
      <div className={styles.bookings}>
        {activeTab === 'upcoming' && upcomingBookings.length === 0 && (
          <div className={styles.empty}>
            <i className="fas fa-calendar-alt"></i>
            <p>No upcoming bookings</p>
            <a href="/chefs">Browse Chefs</a>
          </div>
        )}
        
        {activeTab === 'upcoming' && upcomingBookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} type="upcoming" />
        ))}
        
        {activeTab === 'past' && pastBookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} type="past" />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;