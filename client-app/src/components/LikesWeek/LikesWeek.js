import React from 'react';
import styles from './LikesWeek.module.css';

const LikesWeek = () => {
  return (
    <div className={`${styles['likes-week-block']} ${styles['likes-week-box-shadow']}`}>
      <div className={styles['likes-week-title']}>Наибольшее число лайков</div>
      {[...Array(10)].map((_, idx) => (
        <div key={idx} className={styles['likes-week-row']}>
          <div className={styles['likes-week-number']}>{idx+1}</div>
          <div className={styles['likes-week-avatar']}></div>
          <div className='vertical-column-container'>
            <div className={styles['likes-week-novel-title']}>Название новеллы</div>
            <div className={styles['likes-week-novel-author']}>Автор (страна)</div>
            <div className={styles['likes-week-novel-genres']}>Основные жанры</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikesWeek; 