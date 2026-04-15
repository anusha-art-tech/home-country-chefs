import React from 'react';
import ChefCard from './ChefCard';
import styles from './ChefGrid.module.css';

const ChefGrid = ({ chefs, loading, favoriteChefIds, favoriteBusyIds, onToggleFavorite }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading chefs...</p>
      </div>
    );
  }

  if (chefs.length === 0) {
    return (
      <div className={styles.empty}>
        <i className="fas fa-utensils"></i>
        <h3>No chefs found</h3>
        <p>Try adjusting your filters to find more options</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {chefs.map(chef => (
        <ChefCard
          key={chef.id}
          chef={chef}
          isFavorite={favoriteChefIds?.has?.(chef.id)}
          favoriteDisabled={favoriteBusyIds?.has?.(chef.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default ChefGrid;
