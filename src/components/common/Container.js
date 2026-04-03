import React from 'react';
import styles from './Container.module.css';

const Container = ({ children, maxWidth = 'lg', className }) => {
  const containerClasses = [
    styles.container,
    styles[maxWidth],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default Container;