import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './BookingForm.module.css';

const BookingForm = ({ chef, onSubmit, onCancel, submitting = false }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.section}>
        <h3>Schedule Your Cooking Experience</h3>
        
        <div className={styles.row}>
          <Input
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            min={today}
            required
          />
          
          <Input
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            error={errors.time}
            required
          />
        </div>
        
        <Input
          label="Number of Guests"
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min={1}
          max={20}
        />
      </div>
      
      <div className={styles.section}>
        <h3>Location Details</h3>
        
        <Input
          label="Street Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          placeholder="Your full address"
          required
        />
        
        <div className={styles.row}>
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            required
          />
          
          <Input
            label="Postcode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>

        <div className={styles.row}>
          <Input
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

          <Input
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className={styles.section}>
        <h3>Special Requests</h3>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any dietary restrictions, allergies, or special requests?"
          className={styles.textarea}
          rows={4}
        />
      </div>
      
      <div className={styles.actions}>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving Booking...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
