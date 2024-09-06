// src/components/Landing/Landing.jsx
import React from 'react';
import styles from './Landing.module.css'; // Import the CSS module

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.landingHeader}>Welcome to the Movie Recommendation App</h1>
      <p className={styles.landingSubtitle}>Discover your next favorite movie</p>
      <a href="/movies" className={styles.button}>Browse Movies</a>
    </div>
  );
};

export default Landing;
