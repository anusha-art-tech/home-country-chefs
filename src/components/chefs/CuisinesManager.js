import React, { useEffect, useState } from 'react';
import { chefsAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const sectionStyle = {
  background: '#fff',
  borderRadius: '18px',
  padding: '1.5rem',
  boxShadow: '0 14px 30px rgba(31, 41, 55, 0.08)',
};

const inputStyle = {
  width: '100%',
  padding: '0.9rem 1rem',
  borderRadius: '12px',
  border: '1px solid #d1d7de',
};

const buttonStyle = {
  padding: '0.9rem 1.2rem',
  borderRadius: '12px',
  border: 'none',
  background: '#c96a20',
  color: '#fff',
};

const secondaryButtonStyle = {
  padding: '0.9rem 1.2rem',
  borderRadius: '12px',
  border: '1px solid #d1d7de',
  background: '#fff',
};

const CuisinesManager = ({ standalone = false }) => {
  const { chefProfile, refreshAuth } = useAuth();
  const [cuisines, setCuisines] = useState([]);
  const [cuisineForm, setCuisineForm] = useState({ id: null, name: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const refreshCuisines = async () => {
    if (!chefProfile?.id) return;
    const response = await chefsAPI.getCuisines(chefProfile.id);
    setCuisines(response.data.data || []);
  };

  useEffect(() => {
    if (!chefProfile?.id) return;

    const loadInitialCuisines = async () => {
      const response = await chefsAPI.getCuisines(chefProfile.id);
      setCuisines(response.data.data || []);
    };

    loadInitialCuisines();
  }, [chefProfile?.id]);

  const handleCuisineSubmit = async (event) => {
    event.preventDefault();
    if (chefProfile?.id) {
      setLoading(true);
      setMessage('');
      setError('');
    }
    if (!chefProfile?.id) return;

    try {
      if (cuisineForm.id) {
        await chefsAPI.updateCuisine(chefProfile.id, cuisineForm.id, {
          name: cuisineForm.name,
          description: cuisineForm.description,
        });
        setMessage('Cuisine updated successfully.');
      } else {
        await chefsAPI.createCuisine(chefProfile.id, {
          name: cuisineForm.name,
          description: cuisineForm.description,
        });
        setMessage('Cuisine added successfully.');
      }

      setCuisineForm({ id: null, name: '', description: '' });
      await refreshAuth();
      await refreshCuisines();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to save cuisine.');
    } finally {
      setLoading(false);
    }
  };

  const handleCuisineDelete = async (cuisineId) => {
    if (!chefProfile?.id) return;

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await chefsAPI.deleteCuisine(chefProfile.id, cuisineId);
      if (cuisineForm.id === cuisineId) {
        setCuisineForm({ id: null, name: '', description: '' });
      }
      await refreshAuth();
      await refreshCuisines();
      setMessage('Cuisine removed successfully.');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to remove cuisine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ ...sectionStyle, display: 'grid', gap: '1rem' }}>
      {standalone && (
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Cuisines</h1>
          <p style={{ margin: 0, color: '#5b6470' }}>
            Add, update, and remove the cuisines you want customers to see on your chef profile.
          </p>
        </div>
      )}

      {message && <div style={{ color: '#05603a', background: '#ecfdf3', padding: '1rem', borderRadius: '12px' }}>{message}</div>}
      {error && <div style={{ color: '#b3261e', background: '#fdecea', padding: '1rem', borderRadius: '12px' }}>{error}</div>}

      <form onSubmit={handleCuisineSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label>
          <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Cuisine Name</span>
          <input
            style={inputStyle}
            value={cuisineForm.name}
            onChange={(event) => setCuisineForm((current) => ({ ...current, name: event.target.value }))}
            required
          />
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Description</span>
          <textarea
            style={{ ...inputStyle, minHeight: '100px' }}
            value={cuisineForm.description}
            onChange={(event) => setCuisineForm((current) => ({ ...current, description: event.target.value }))}
          />
        </label>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {cuisineForm.id ? 'Update Cuisine' : 'Add Cuisine'}
          </button>
          {cuisineForm.id && (
            <button
              type="button"
              onClick={() => setCuisineForm({ id: null, name: '', description: '' })}
              style={secondaryButtonStyle}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {cuisines.length === 0 && <p style={{ margin: 0, color: '#5b6470' }}>No cuisines added yet.</p>}
        {cuisines.map((cuisine) => (
          <div key={cuisine.id} style={{ border: '1px solid #e5e7eb', borderRadius: '14px', padding: '1rem', display: 'grid', gap: '0.75rem' }}>
            <div>
              <strong>{cuisine.name}</strong>
              {cuisine.description && <p style={{ margin: '0.45rem 0 0', color: '#5b6470' }}>{cuisine.description}</p>}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setCuisineForm({ id: cuisine.id, name: cuisine.name, description: cuisine.description || '' })}
                style={secondaryButtonStyle}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleCuisineDelete(cuisine.id)}
                style={secondaryButtonStyle}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CuisinesManager;
