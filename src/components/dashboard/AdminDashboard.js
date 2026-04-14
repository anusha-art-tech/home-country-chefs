import React, { useState } from 'react';
import { adminAPI } from '../../services/api';
import { formatPrice, formatDate } from '../../utils/helpers';

const cardStyle = {
  background: '#fff',
  borderRadius: '18px',
  padding: '1.25rem',
  boxShadow: '0 14px 30px rgba(31, 41, 55, 0.08)',
};

const AdminDashboard = ({ admin, stats, users, chefs, bookings, onRefresh }) => {
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');

  const handleVerifyChef = async (chefId) => {
    setBusyId(`chef-${chefId}`);
    setError('');
    try {
      await adminAPI.verifyChef(chefId);
      await onRefresh();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to verify chef.');
    } finally {
      setBusyId(null);
    }
  };

  const handleRoleChange = async (userId, role) => {
    setBusyId(`user-${userId}`);
    setError('');
    try {
      await adminAPI.updateUserRole(userId, role);
      await onRefresh();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to update user role.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Admin Dashboard</h1>
        <p style={{ color: '#5b6470' }}>Signed in as {admin?.name}. Monitor platform activity and manage accounts.</p>
      </div>

      {error && <div style={{ ...cardStyle, color: '#b3261e' }}>{error}</div>}

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div style={cardStyle}><strong>{stats?.totalUsers ?? 0}</strong><div>Total Users</div></div>
        <div style={cardStyle}><strong>{stats?.totalChefs ?? 0}</strong><div>Total Chefs</div></div>
        <div style={cardStyle}><strong>{stats?.totalBookings ?? 0}</strong><div>Total Bookings</div></div>
        <div style={cardStyle}><strong>{formatPrice(stats?.totalRevenue || 0)}</strong><div>Completed Revenue</div></div>
      </div>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Users</h2>
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {users.map((user) => (
            <div key={user.id} style={{ display: 'grid', gap: '0.5rem', padding: '0.9rem 0', borderBottom: '1px solid #edf1f5' }}>
              <div><strong>{user.name}</strong> <span style={{ color: '#667085' }}>({user.email})</span></div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span>Role: {user.role}</span>
                <select
                  value={user.role}
                  onChange={(event) => handleRoleChange(user.id, event.target.value)}
                  disabled={busyId === `user-${user.id}`}
                  style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #d1d7de' }}
                >
                  <option value="customer">Customer</option>
                  <option value="chef">Chef</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Chefs</h2>
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {chefs.map((chef) => (
            <div key={chef.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.9rem 0', borderBottom: '1px solid #edf1f5', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <strong>{chef.name}</strong>
                <div style={{ color: '#667085' }}>{chef.cuisine} • {chef.city}{chef.state ? `, ${chef.state}` : ''}</div>
              </div>
              <button
                type="button"
                disabled={chef.isVerified || busyId === `chef-${chef.id}`}
                onClick={() => handleVerifyChef(chef.id)}
                style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: 'none', background: chef.isVerified ? '#d1fadf' : '#c96a20', color: chef.isVerified ? '#05603a' : '#fff' }}
              >
                {chef.isVerified ? 'Verified' : 'Verify Chef'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Recent Bookings</h2>
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {bookings.map((booking) => (
            <div key={booking.id} style={{ padding: '0.9rem 0', borderBottom: '1px solid #edf1f5' }}>
              <strong>{booking.chefName}</strong> with {booking.customerName}
              <div style={{ color: '#667085' }}>
                {formatDate(booking.date)} at {booking.time} • {booking.status} • {formatPrice(booking.totalAmount || 0)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
