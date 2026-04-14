import React, { useEffect, useState } from 'react';
import { authAPI, chefsAPI, usersAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

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

const listToText = (value) => (Array.isArray(value) ? value.join(', ') : '');

const ProfilePage = () => {
  const { user, chefProfile, refreshAuth } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [chefForm, setChefForm] = useState({
    cuisine: '',
    bio: '',
    experience: '',
    pricePerService: '',
    pricePerGuest: '',
    travelFee: '',
    serviceRadius: '',
    minimumGuests: '',
    maxGuests: '',
    responseTime: '',
    specialties: '',
    dietaryOptions: '',
    languages: '',
    signatureDishes: '',
    certifications: '',
    serviceAreas: '',
    sampleMenu: '',
    kitchenRequirements: '',
    allergenExperience: '',
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setProfileForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      country: user.country || '',
      zipCode: user.zipCode || '',
    });
  }, [user]);

  useEffect(() => {
    if (!chefProfile) return;

    setChefForm({
      cuisine: chefProfile.cuisine || '',
      bio: chefProfile.bio || '',
      experience: chefProfile.experience || '',
      pricePerService: chefProfile.pricePerService || '',
      pricePerGuest: chefProfile.pricePerGuest || '',
      travelFee: chefProfile.travelFee || '',
      serviceRadius: chefProfile.serviceRadius || '',
      minimumGuests: chefProfile.minimumGuests || '',
      maxGuests: chefProfile.maxGuests || '',
      responseTime: chefProfile.responseTime || '',
      specialties: listToText(chefProfile.specialties),
      dietaryOptions: listToText(chefProfile.dietaryOptions),
      languages: listToText(chefProfile.languages),
      signatureDishes: listToText(chefProfile.signatureDishes),
      certifications: listToText(chefProfile.certifications),
      serviceAreas: listToText(chefProfile.serviceAreas),
      sampleMenu: chefProfile.sampleMenu || '',
      kitchenRequirements: chefProfile.kitchenRequirements || '',
      allergenExperience: chefProfile.allergenExperience || '',
    });
    setExistingGalleryImages(Array.isArray(chefProfile.galleryImages) ? chefProfile.galleryImages : []);
  }, [chefProfile]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await Promise.all([
        usersAPI.updateProfile(profileForm),
        authAPI.updateDetails(profileForm),
      ]);
      await refreshAuth();
      setMessage('Profile updated successfully.');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await authAPI.updatePassword(passwordForm);
      setPasswordForm({ currentPassword: '', newPassword: '' });
      await refreshAuth();
      setMessage('Password updated successfully.');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to update password.');
    } finally {
      setLoading(false);
    }
  };

  const handleChefProfileSubmit = async (event) => {
    event.preventDefault();
    if (!chefProfile?.id) return;

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const payload = new FormData();

      Object.entries(chefForm).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      existingGalleryImages.forEach((image) => {
        payload.append('existingGalleryImages', image);
      });

      if (profileImageFile) {
        payload.append('profileImage', profileImageFile);
      }

      galleryImageFiles.forEach((file) => {
        payload.append('galleryImages', file);
      });

      await chefsAPI.updateProfile(chefProfile.id, payload);
      setProfileImageFile(null);
      setGalleryImageFiles([]);
      await refreshAuth();
      setMessage('Chef profile updated successfully.');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to update chef profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '4rem 1.5rem', maxWidth: '960px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Profile</h1>
        <p style={{ color: '#5b6470' }}>
          Manage your account details{user?.role === 'chef' && chefProfile ? ', chef profile, and cuisines.' : '.'}
        </p>
      </div>

      {message && <div style={{ ...sectionStyle, color: '#05603a', background: '#ecfdf3' }}>{message}</div>}
      {error && <div style={{ ...sectionStyle, color: '#b3261e', background: '#fdecea' }}>{error}</div>}

      <form onSubmit={handleProfileSubmit} style={{ ...sectionStyle, display: 'grid', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>Edit Profile</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Full Name</span>
            <input style={inputStyle} value={profileForm.name} onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))} required />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Email</span>
            <input style={inputStyle} type="email" value={profileForm.email} onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))} required />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Phone</span>
            <input style={inputStyle} value={profileForm.phone} onChange={(event) => setProfileForm((current) => ({ ...current, phone: event.target.value }))} />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Postcode</span>
            <input style={inputStyle} value={profileForm.zipCode} onChange={(event) => setProfileForm((current) => ({ ...current, zipCode: event.target.value }))} />
          </label>
        </div>

        <label>
          <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Address</span>
          <input style={inputStyle} value={profileForm.address} onChange={(event) => setProfileForm((current) => ({ ...current, address: event.target.value }))} />
        </label>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>City</span>
            <input style={inputStyle} value={profileForm.city} onChange={(event) => setProfileForm((current) => ({ ...current, city: event.target.value }))} />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>County / State</span>
            <input style={inputStyle} value={profileForm.state} onChange={(event) => setProfileForm((current) => ({ ...current, state: event.target.value }))} />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Country</span>
            <input style={inputStyle} value={profileForm.country} onChange={(event) => setProfileForm((current) => ({ ...current, country: event.target.value }))} />
          </label>
        </div>

        <div>
          <button type="submit" disabled={loading} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: 'none', background: '#c96a20', color: '#fff' }}>
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>

      {user?.role === 'chef' && chefProfile && (
        <form onSubmit={handleChefProfileSubmit} style={{ ...sectionStyle, display: 'grid', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>Chef Profile Details</h2>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Cuisine</span>
              <input style={inputStyle} value={chefForm.cuisine} onChange={(event) => setChefForm((current) => ({ ...current, cuisine: event.target.value }))} />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Experience</span>
              <input style={inputStyle} type="number" value={chefForm.experience} onChange={(event) => setChefForm((current) => ({ ...current, experience: event.target.value }))} />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Price Per Service</span>
              <input style={inputStyle} type="number" value={chefForm.pricePerService} onChange={(event) => setChefForm((current) => ({ ...current, pricePerService: event.target.value }))} />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Price Per Guest</span>
              <input style={inputStyle} type="number" value={chefForm.pricePerGuest} onChange={(event) => setChefForm((current) => ({ ...current, pricePerGuest: event.target.value }))} />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Travel Fee</span>
              <input style={inputStyle} type="number" value={chefForm.travelFee} onChange={(event) => setChefForm((current) => ({ ...current, travelFee: event.target.value }))} />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Service Radius</span>
              <input style={inputStyle} type="number" value={chefForm.serviceRadius} onChange={(event) => setChefForm((current) => ({ ...current, serviceRadius: event.target.value }))} />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Minimum Guests</span>
              <input style={inputStyle} type="number" value={chefForm.minimumGuests} onChange={(event) => setChefForm((current) => ({ ...current, minimumGuests: event.target.value }))} />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Maximum Guests</span>
              <input style={inputStyle} type="number" value={chefForm.maxGuests} onChange={(event) => setChefForm((current) => ({ ...current, maxGuests: event.target.value }))} />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Response Time</span>
              <input style={inputStyle} value={chefForm.responseTime} onChange={(event) => setChefForm((current) => ({ ...current, responseTime: event.target.value }))} />
            </label>
          </div>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Profile Image</span>
              <input type="file" accept="image/*" onChange={(event) => setProfileImageFile(event.target.files?.[0] || null)} />
              {chefProfile.profileImage && <img src={chefProfile.profileImage} alt={chefProfile.name} style={{ width: '100%', maxWidth: '180px', marginTop: '0.75rem', borderRadius: '12px' }} />}
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Gallery Images</span>
              <input type="file" accept="image/*" multiple onChange={(event) => setGalleryImageFiles(Array.from(event.target.files || []))} />
            </label>
          </div>

          {existingGalleryImages.length > 0 && (
            <div>
              <h3 style={{ marginBottom: '0.75rem' }}>Current Gallery</h3>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
                {existingGalleryImages.map((image) => (
                  <div key={image} style={{ border: '1px solid #e5e7eb', borderRadius: '14px', padding: '0.75rem' }}>
                    <img src={image} alt="Chef gallery" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }} />
                    <button
                      type="button"
                      onClick={() => setExistingGalleryImages((current) => current.filter((item) => item !== image))}
                      style={{ marginTop: '0.75rem', width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #d1d7de', background: '#fff' }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <label><span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Specialties</span><input style={inputStyle} value={chefForm.specialties} onChange={(event) => setChefForm((current) => ({ ...current, specialties: event.target.value }))} /></label>
          <label><span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Dietary Options</span><input style={inputStyle} value={chefForm.dietaryOptions} onChange={(event) => setChefForm((current) => ({ ...current, dietaryOptions: event.target.value }))} /></label>
          <label><span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Languages</span><input style={inputStyle} value={chefForm.languages} onChange={(event) => setChefForm((current) => ({ ...current, languages: event.target.value }))} /></label>
          <label><span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Signature Dishes</span><input style={inputStyle} value={chefForm.signatureDishes} onChange={(event) => setChefForm((current) => ({ ...current, signatureDishes: event.target.value }))} /></label>
          <label><span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Certifications</span><input style={inputStyle} value={chefForm.certifications} onChange={(event) => setChefForm((current) => ({ ...current, certifications: event.target.value }))} /></label>
          <label><span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Service Areas</span><input style={inputStyle} value={chefForm.serviceAreas} onChange={(event) => setChefForm((current) => ({ ...current, serviceAreas: event.target.value }))} /></label>

          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Chef Bio</span>
            <textarea style={{ ...inputStyle, minHeight: '120px' }} value={chefForm.bio} onChange={(event) => setChefForm((current) => ({ ...current, bio: event.target.value }))} />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Sample Menu</span>
            <textarea style={{ ...inputStyle, minHeight: '120px' }} value={chefForm.sampleMenu} onChange={(event) => setChefForm((current) => ({ ...current, sampleMenu: event.target.value }))} />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Kitchen Requirements</span>
            <textarea style={{ ...inputStyle, minHeight: '100px' }} value={chefForm.kitchenRequirements} onChange={(event) => setChefForm((current) => ({ ...current, kitchenRequirements: event.target.value }))} />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Allergen Experience</span>
            <textarea style={{ ...inputStyle, minHeight: '100px' }} value={chefForm.allergenExperience} onChange={(event) => setChefForm((current) => ({ ...current, allergenExperience: event.target.value }))} />
          </label>

          <div>
            <button type="submit" disabled={loading} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: 'none', background: '#c96a20', color: '#fff' }}>
              {loading ? 'Saving...' : 'Save Chef Profile'}
            </button>
          </div>
        </form>
      )}

      <form onSubmit={handlePasswordSubmit} style={{ ...sectionStyle, display: 'grid', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>Update Password</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Current Password</span>
            <input style={inputStyle} type="password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))} required />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>New Password</span>
            <input style={inputStyle} type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))} required />
          </label>
        </div>

        <div>
          <button type="submit" disabled={loading} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: 'none', background: '#c96a20', color: '#fff' }}>
            {loading ? 'Saving...' : 'Update Password'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
