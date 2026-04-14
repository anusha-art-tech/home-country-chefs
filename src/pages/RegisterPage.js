import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '4rem 1.5rem', maxWidth: '560px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.75rem' }}>Create your account</h1>
      <p style={{ marginBottom: '2rem', color: '#5b6470' }}>
        Join Origin Foods as a customer or chef and complete your profile during signup.
      </p>
      <RegisterForm onSuccess={() => navigate('/dashboard')} />
      <p style={{ marginTop: '1.5rem' }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
};

export default RegisterPage;
