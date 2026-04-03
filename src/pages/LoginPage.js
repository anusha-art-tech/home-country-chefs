import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '4rem 1.5rem', maxWidth: '480px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.75rem' }}>Welcome back</h1>
      <p style={{ marginBottom: '2rem', color: '#5b6470' }}>
        Sign in to manage your bookings and chef experiences.
      </p>
      <p style={{ marginBottom: '1rem', color: '#8b4c18', fontSize: '0.95rem' }}>
        Use an email containing <strong>chef</strong> to preview the chef dashboard.
      </p>
      <LoginForm onSuccess={() => navigate('/dashboard')} />
      <p style={{ marginTop: '1.5rem' }}>
        Don&apos;t have an account? <Link to="/register">Create one</Link>
      </p>
    </section>
  );
};

export default LoginPage;
