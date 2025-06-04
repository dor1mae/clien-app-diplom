import React from 'react';
import styles from './AuthorNewbies.module.css';
import '../Main.css';

const AuthorNewbies = () => {
  return (
    <div className={`${styles['author-newbies-block']} ${styles['box-shadow']}`}>
      <div className={styles['author-newbies-title']}>Лучшие авторы новички</div>
      {[...Array(10)].map((_, idx) => (
        <div key={idx} className={styles['author-newbies-row']}>
          <div className={styles['author-newbies-number']}>{idx+1}</div>
          <div className={styles['author-newbies-avatar']}></div>
          <div className='vertical-column-container'>
            <div className={styles['author-newbies-name']}>Имя автора</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorNewbies; 