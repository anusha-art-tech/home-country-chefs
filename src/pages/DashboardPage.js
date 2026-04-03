import React from 'react';
import { useAuth } from '../hooks/useAuth';
import UserDashboard from '../components/dashboard/UserDashboard';
import ChefDashboard from '../components/dashboard/ChefDashboard';
import { mockBookings } from '../services/mockData';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const userRole = user?.role || 'user';

  return (
    <div className={styles.page}>
      {userRole === 'chef' ? (
        <ChefDashboard chef={user} bookings={mockBookings} />
      ) : (
        <UserDashboard user={user} bookings={mockBookings} />
      )}
    </div>
  );
};

export default DashboardPage;
