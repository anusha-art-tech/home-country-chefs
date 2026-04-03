import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import BookingSummary from '../components/booking/BookingSummary';
import { mockChefs } from '../services/mockData';
import styles from './BookingPage.module.css';

const BookingPage = () => {
  const { chefId } = useParams();
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const foundChef = mockChefs.find(c => c.id === parseInt(chefId));
    if (foundChef) {
      setChef(foundChef);
    }
  }, [chefId]);

  const handleBookingSubmit = (details) => {
    setBookingDetails(details);
    // In real app, would submit to API
    alert('Booking confirmed! Check your dashboard for details.');
    navigate('/dashboard');
  };

  if (!chef) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.formColumn}>
          <BookingForm chef={chef} onSubmit={handleBookingSubmit} onCancel={() => navigate(-1)} />
        </div>
        <div className={styles.summaryColumn}>
          <BookingSummary chef={chef} bookingDetails={bookingDetails} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;