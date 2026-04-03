import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you</p>
      </div>
      
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <h2>Contact Information</h2>
            <div className={styles.contactInfo}>
              <div className={styles.item}>
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Address</strong>
                  <p>123 Foodie Lane, Culinary District, NY 10001</p>
                </div>
              </div>
              <div className={styles.item}>
                <i className="fas fa-phone"></i>
                <div>
                  <strong>Phone</strong>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className={styles.item}>
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>Email</strong>
                  <p>support@originfoods.com</p>
                </div>
              </div>
              <div className={styles.item}>
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Support Hours</strong>
                  <p>Monday - Friday: 9AM - 6PM EST</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.formWrapper}>
            {submitted ? (
              <div className={styles.success}>
                <i className="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
                <div className={styles.textareaGroup}>
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us more..."
                    required
                  />
                </div>
                <Button type="submit" fullWidth>
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;