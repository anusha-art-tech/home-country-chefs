import React from 'react';
import { Navigate } from 'react-router-dom';
import CuisinesManager from '../components/chefs/CuisinesManager';
import { useAuth } from '../hooks/useAuth';

const CuisinesPage = () => {
  const { user } = useAuth();

  if (user?.role !== 'chef') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section style={{ padding: '4rem 1.5rem', maxWidth: '960px', margin: '0 auto' }}>
      <CuisinesManager standalone />
    </section>
  );
};

export default CuisinesPage;
