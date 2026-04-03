import React from 'react';
import styles from './Section.module.css';

const Section = ({ children, title, subtitle, background = 'white', className }) => {
  const sectionClasses = [
    styles.section,
    styles[background],
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClasses}>
      <div className={styles.container}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;