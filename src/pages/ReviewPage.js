import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reviewsAPI } from '../services/api';

const ReviewPage = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await reviewsAPI.create({
        bookingId: Number(bookingId),
        rating: Number(formData.rating),
        title: formData.title,
        comment: formData.comment,
      });
      navigate('/dashboard');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '4rem 1.5rem', maxWidth: '680px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.75rem' }}>Write a review</h1>
      <p style={{ marginBottom: '2rem', color: '#5b6470' }}>
        Share how your booking went so other customers can choose confidently.
      </p>
      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.85rem 1rem', borderRadius: '12px', background: '#fdecea', color: '#b3261e' }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label>
          <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Rating</span>
          <select
            value={formData.rating}
            onChange={(event) => setFormData((current) => ({ ...current, rating: event.target.value }))}
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid #d1d7de' }}
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>{value} Star{value > 1 ? 's' : ''}</option>
            ))}
          </select>
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Title</span>
          <input
            value={formData.title}
            onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
            required
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid #d1d7de' }}
          />
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Comment</span>
          <textarea
            rows={6}
            value={formData.comment}
            onChange={(event) => setFormData((current) => ({ ...current, comment: event.target.value }))}
            required
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid #d1d7de' }}
          />
        </label>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: '1px solid #d1d7de', background: '#fff' }}>
            Cancel
          </button>
          <button type="submit" disabled={loading} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: 'none', background: '#c96a20', color: '#fff' }}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReviewPage;
