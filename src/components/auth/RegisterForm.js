import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './RegisterForm.module.css';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await register({ name: formData.name, email: formData.email, role: formData.role });
      onSuccess?.();
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errors.submit && <div className={styles.errorMessage}>{errors.submit}</div>}
      
      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="John Doe"
        required
      />
      
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="you@example.com"
        required
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Create a password"
        required
      />
      
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        required
      />

      <div className={styles.roleGroup}>
        <span className={styles.roleLabel}>Account Type</span>
        <div className={styles.roleOptions}>
          <button
            type="button"
            className={`${styles.roleOption} ${formData.role === 'user' ? styles.roleOptionActive : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, role: 'user' }))}
          >
            Customer
          </button>
          <button
            type="button"
            className={`${styles.roleOption} ${formData.role === 'chef' ? styles.roleOptionActive : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, role: 'chef' }))}
          >
            Chef
          </button>
        </div>
      </div>
      
      <Button type="submit" fullWidth disabled={loading}>
        {loading ? 'Creating Account...' : 'Sign Up'}
      </Button>
      
      <p className={styles.terms}>
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
};

export default RegisterForm;
