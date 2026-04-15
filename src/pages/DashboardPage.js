import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import UserDashboard from '../components/dashboard/UserDashboard';
import ChefDashboard from '../components/dashboard/ChefDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import { adminAPI, bookingsAPI, reviewsAPI, usersAPI } from '../services/api';
import { normalizeBooking } from '../utils/helpers';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { user, chefProfile, refreshAuth } = useAuth();
  const userRole = user?.role || 'customer';
  const [payload, setPayload] = useState({
    bookings: [],
    reviews: [],
    stats: null,
    users: [],
    chefs: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError('');

      try {
        if (userRole === 'admin') {
          const [statsResponse, usersResponse, chefsResponse, bookingsResponse] = await Promise.all([
            adminAPI.getStats(),
            adminAPI.getUsers(),
            adminAPI.getChefs(),
            adminAPI.getBookings(),
          ]);

          setPayload({
            stats: statsResponse.data.data,
            users: usersResponse.data.data,
            chefs: chefsResponse.data.data,
            bookings: bookingsResponse.data.data.map(normalizeBooking),
            reviews: [],
          });
        } else if (userRole === 'chef') {
          const bookingsResponse = await bookingsAPI.getChefBookings();
          setPayload({
            bookings: bookingsResponse.data.data.map(normalizeBooking),
            reviews: [],
            stats: null,
            users: [],
            chefs: [],
          });
        } else {
          const [bookingsResponse, statsResponse, reviewsResponse] = await Promise.all([
            usersAPI.getBookings(),
            usersAPI.getStats(),
            usersAPI.getReviews(),
          ]);

          setPayload({
            bookings: bookingsResponse.data.data.map(normalizeBooking),
            reviews: reviewsResponse.data.data || [],
            stats: statsResponse.data.data,
            users: [],
            chefs: [],
          });
        }
      } catch (apiError) {
        setError(apiError.response?.data?.message || 'Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadDashboard();
    }
  }, [user, userRole]);

  const handleChefBookingAction = async (bookingId, status) => {
    await bookingsAPI.updateStatus(bookingId, status);
    const bookingsResponse = await bookingsAPI.getChefBookings();
    setPayload((current) => ({
      ...current,
      bookings: bookingsResponse.data.data.map(normalizeBooking),
    }));
  };

  const handleCustomerCancel = async (bookingId) => {
    await bookingsAPI.cancel(bookingId, 'Cancelled by customer');
    const [bookingsResponse, statsResponse] = await Promise.all([
      usersAPI.getBookings(),
      usersAPI.getStats(),
    ]);
    setPayload((current) => ({
      bookings: bookingsResponse.data.data.map(normalizeBooking),
      reviews: current.reviews,
      stats: statsResponse.data.data,
      users: [],
      chefs: [],
    }));
  };

  const handleCustomerReviewDelete = async (reviewId) => {
    await reviewsAPI.remove(reviewId);
    const [bookingsResponse, statsResponse, reviewsResponse] = await Promise.all([
      usersAPI.getBookings(),
      usersAPI.getStats(),
      usersAPI.getReviews(),
    ]);

    setPayload({
      bookings: bookingsResponse.data.data.map(normalizeBooking),
      reviews: reviewsResponse.data.data || [],
      stats: statsResponse.data.data,
      users: [],
      chefs: [],
    });
  };

  const handleAdminRefresh = async () => {
    await refreshAuth();
    const [statsResponse, usersResponse, chefsResponse, bookingsResponse] = await Promise.all([
      adminAPI.getStats(),
      adminAPI.getUsers(),
      adminAPI.getChefs(),
      adminAPI.getBookings(),
    ]);

    setPayload({
      stats: statsResponse.data.data,
      users: usersResponse.data.data,
      chefs: chefsResponse.data.data,
      bookings: bookingsResponse.data.data.map(normalizeBooking),
      reviews: [],
    });
  };

  return (
    <div className={styles.page}>
      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p style={{ color: '#b3261e' }}>{error}</p>
      ) : userRole === 'admin' ? (
        <AdminDashboard
          admin={user}
          stats={payload.stats}
          users={payload.users}
          chefs={payload.chefs}
          bookings={payload.bookings}
          onRefresh={handleAdminRefresh}
        />
      ) : userRole === 'chef' ? (
        <ChefDashboard chef={{ ...user, ...chefProfile }} bookings={payload.bookings} onBookingAction={handleChefBookingAction} />
      ) : (
        <UserDashboard
          user={user}
          bookings={payload.bookings}
          reviews={payload.reviews}
          stats={payload.stats}
          onCancelBooking={handleCustomerCancel}
          onDeleteReview={handleCustomerReviewDelete}
        />
      )}
    </div>
  );
};

export default DashboardPage;
