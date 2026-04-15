import React from 'react';
import Button from '../common/Button';
import { formatPrice } from '../../utils/helpers';
import styles from './ChefProfile.module.css';

const ChefProfile = ({ chef, onBook, isFavorite, onToggleFavorite, favoriteDisabled }) => {
  const reviews = chef.reviewItems || chef.reviewsList || [];
  const listOrEmpty = (items) => Array.isArray(items) && items.length > 0;

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {chef.profileImage ? <img src={chef.profileImage} alt={chef.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="fas fa-user-chef"></i>}
        </div>
        <div className={styles.info}>
          <h1>{chef.name}</h1>
          <p className={styles.cuisine}>{chef.cuisine} Cuisine</p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <i className="fas fa-star"></i>
              <span>{chef.rating}</span>
              <small>({chef.totalReviews ?? chef.reviewsCount ?? reviews.length ?? 0} reviews)</small>
            </div>
            <div className={styles.stat}>
              <i className="fas fa-map-marker-alt"></i>
              <span>{chef.location}</span>
            </div>
            <div className={styles.stat}>
              <i className="fas fa-clock"></i>
              <span>{chef.experience} years experience</span>
            </div>
            <div className={styles.stat}>
              <i className="fas fa-pound-sign"></i>
              <span>{formatPrice(chef.pricePerService)} per service</span>
            </div>
          </div>
        </div>
        <div className={styles.headerActions}>
          {onToggleFavorite && (
            <Button variant={isFavorite ? 'secondary' : 'outline'} size="large" onClick={onToggleFavorite} disabled={favoriteDisabled}>
              <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
              {isFavorite ? 'Saved' : 'Save'}
            </Button>
          )}
          <Button size="large" onClick={onBook}>
            Book This Chef
          </Button>
        </div>
      </div>
      
      <div className={styles.bio}>
        <h3>About Chef {chef.name.split(' ')[1]}</h3>
        <p>{chef.bio}</p>
      </div>
      
      <div className={styles.specialties}>
        <h3>Signature Dishes</h3>
        <div className={styles.dishesList}>
          {chef.signatureDishes?.map((dish, index) => (
            <div key={index} className={styles.dish}>
              <i className="fas fa-utensil-spoon"></i>
              <span>{dish}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bio}>
        <h3>Chef Details</h3>
        <p><strong>Cuisines:</strong> {listOrEmpty(chef.cuisineNames) ? chef.cuisineNames.join(', ') : chef.cuisine}</p>
        <p><strong>Specialties:</strong> {listOrEmpty(chef.specialties) ? chef.specialties.join(', ') : 'Not specified'}</p>
        <p><strong>Dietary Options:</strong> {listOrEmpty(chef.dietaryOptions) ? chef.dietaryOptions.join(', ') : 'Not specified'}</p>
        <p><strong>Languages:</strong> {listOrEmpty(chef.languages) ? chef.languages.join(', ') : 'Not specified'}</p>
        <p><strong>Service Areas:</strong> {listOrEmpty(chef.serviceAreas) ? chef.serviceAreas.join(', ') : chef.location}</p>
        <p><strong>Guest Capacity:</strong> {chef.minimumGuests || 1} to {chef.maxGuests || 12} guests</p>
        <p><strong>Travel Fee:</strong> {formatPrice(chef.travelFee || 0)}</p>
        <p><strong>Response Time:</strong> {chef.responseTime || 'Usually responds within 24 hours'}</p>
      </div>

      {listOrEmpty(chef.cuisines) && (
        <div className={styles.specialties}>
          <h3>Offered Cuisines</h3>
          <div className={styles.cuisineGrid}>
            {chef.cuisines.map((item) => (
              <div key={item.id} className={styles.cuisineCard}>
                {item.icon ? (
                  <img src={item.icon} alt={item.name} className={styles.cuisineImage} />
                ) : (
                  <div className={styles.cuisineImageFallback}>
                    <i className="fas fa-bowl-food"></i>
                  </div>
                )}
                <div className={styles.cuisineContent}>
                  <strong>{item.name}</strong>
                  {item.description && <p>{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {chef.sampleMenu && (
        <div className={styles.bio}>
          <h3>Sample Menu</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{chef.sampleMenu}</p>
        </div>
      )}

      {chef.kitchenRequirements && (
        <div className={styles.bio}>
          <h3>Kitchen Requirements</h3>
          <p>{chef.kitchenRequirements}</p>
        </div>
      )}

      {chef.allergenExperience && (
        <div className={styles.bio}>
          <h3>Allergen Experience</h3>
          <p>{chef.allergenExperience}</p>
        </div>
      )}

      {listOrEmpty(chef.certifications) && (
        <div className={styles.specialties}>
          <h3>Certifications</h3>
          <div className={styles.dishesList}>
            {chef.certifications.map((item, index) => (
              <div key={index} className={styles.dish}>
                <i className="fas fa-award"></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {listOrEmpty(chef.galleryImages) && (
        <div className={styles.specialties}>
          <h3>Gallery</h3>
          <div className={styles.galleryGrid}>
            {chef.galleryImages.map((image, index) => (
              <img key={index} src={image} alt={`${chef.name} dish ${index + 1}`} className={styles.galleryImage} />
            ))}
          </div>
        </div>
      )}
      
      <div className={styles.reviews}>
        <h3>Customer Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <div className={styles.reviewHeader}>
              <strong>{review.user?.name || review.userName}</strong>
              <div className={styles.reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < review.rating ? styles.filled : ''}`}></i>
                ))}
              </div>
            </div>
            <p>{review.comment}</p>
            <small>{review.createdAt || review.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefProfile;
