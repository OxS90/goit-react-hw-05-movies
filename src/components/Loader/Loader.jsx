import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
