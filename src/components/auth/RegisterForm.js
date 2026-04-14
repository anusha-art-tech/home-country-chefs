import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './RegisterForm.module.css';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    cuisine: '',
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
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (formData.role === 'chef') {
      if (!formData.cuisine) newErrors.cuisine = 'Cuisine is required';
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
      const payload = new FormData();

      Object.entries({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
        cuisine: formData.cuisine,
      }).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      await register(payload);
      onSuccess?.();
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errors.submit && <div className={styles.errorMessage}>{errors.submit}</div>}

      <div className={styles.twoColumnGrid}>
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
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+44 20 7946 0958"
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

        <div className={styles.fullWidth}>
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
        </div>
      </div>

      <div className={styles.roleGroup}>
        <span className={styles.roleLabel}>Account Type</span>
        <div className={styles.roleOptions}>
          <button
            type="button"
            className={`${styles.roleOption} ${formData.role === 'customer' ? styles.roleOptionActive : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, role: 'customer' }))}
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

      <div className={styles.twoColumnGrid}>
        <div className={styles.fullWidth}>
          <Input
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="Street address"
          />
        </div>
        <Input
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          required
        />
        <Input
          label="State"
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          error={errors.state}
        />
        <Input
          label="Country"
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
          required
        />
        <Input
          label="Postcode"
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          error={errors.zipCode}
        />
      </div>

      {formData.role === 'chef' && (
        <div className={styles.twoColumnGrid}>
          <div className={styles.fullWidth}>
            <Input
              label="Cuisine"
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              error={errors.cuisine}
              placeholder="British, Indian, Italian..."
              required
            />
          </div>
        </div>
      )}
      
      <Button type="submit" fullWidth disabled={loading}>
        {loading ? 'Creating Account...' : 'Sign Up'}
      </Button>
      
      <p className={styles.terms}>
        Customer and chef accounts can register here. Admin access is managed separately.
      </p>
    </form>
  );
};

export default RegisterForm;
