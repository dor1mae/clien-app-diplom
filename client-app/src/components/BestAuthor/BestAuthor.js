import React from "react";
import styles from "./BestAuthor.module.css";
import '../Main.css';

const BestAuthor = () => {
    return (
        <div className={`borderless-box ${styles['best-author-box']}`}>
            {/* Заголовок "Автор" */}
            <div className={styles['best-author-title']}>Автор</div>
            {/* Блок с фото и описанием автора */}
            <div className={styles['best-author-author-row']}>
                <div className={styles['best-author-photo']} />
                <div>
                    <div className={styles['best-author-author-name']}>Автор</div>
                    <div className={styles['best-author-author-desc']}>Описание автора</div>
                </div>
            </div>
            {/* Заголовок "Его лучшая работа" */}
            <div className={styles['best-author-subtitle']}>Его лучшая работа</div>
            {/* Блок с работой */}
            <div className={styles['best-author-work-row']}>
                <div className={styles['best-author-work-photo']} />
                <div>
                    <div className={styles['best-author-work-title']}>Название новеллы</div>
                    <div className={styles['best-author-work-author']}>Автор (страна)</div>
                    <div className={styles['best-author-work-genres']}>Основные жанры</div>
                </div>
            </div>
        </div>
    );
}

export default BestAuthor;