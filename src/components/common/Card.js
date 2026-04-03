import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, className, hoverable = true, padding = 'medium', ...props }) => {
  const cardClasses = [
    styles.card,
    hoverable && styles.hoverable,
    styles[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;