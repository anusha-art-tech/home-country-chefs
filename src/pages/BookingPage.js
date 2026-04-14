import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import BookingSummary from '../components/booking/BookingSummary';
import { bookingsAPI, chefsAPI } from '../services/api';
import { normalizeChef } from '../utils/helpers';
import styles from './BookingPage.module.css';

const BookingPage = () => {
  const { chefId } = useParams();
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const response = await chefsAPI.getById(chefId);
        setChef(normalizeChef(response.data.data));
      } catch (apiError) {
        setError(apiError.response?.data?.message || 'Unable to load chef.');
      }
    };

    fetchChef();
  }, [chefId]);

  const handleBookingSubmit = async (details) => {
    setBookingDetails(details);
    setSubmitting(true);
    setError('');

    try {
      await bookingsAPI.create({
        chefId: Number(chefId),
        ...details,
      });
      navigate('/dashboard');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to create booking.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!chef) {
    return <div className={styles.loading}>{error || 'Loading...'}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {error && <p style={{ color: '#b3261e' }}>{error}</p>}
        <div className={styles.formColumn}>
          <BookingForm chef={chef} onSubmit={handleBookingSubmit} onCancel={() => navigate(-1)} submitting={submitting} />
        </div>
        <div className={styles.summaryColumn}>
          <BookingSummary chef={chef} bookingDetails={bookingDetails} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
