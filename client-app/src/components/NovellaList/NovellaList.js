import React from "react";
import styles from "./NovellaList.module.css";

const NovellaList = ({ title = "За день", novellas = [] }) => {
  return (
    <div className={styles["novella-list-box"]}>
      <div className={styles["novella-list-title"]}>{title}</div>
      <div className={styles["novella-list-content"]}>
        {novellas.map((novella, idx) => (
          <div className={styles["novella-list-row"]} key={idx}>
            <div className={styles["novella-list-cover"]} />
            <div>
              <div className={styles["novella-list-novel-title"]}>{novella.title}</div>
              <div className={styles["novella-list-novel-author"]}>{novella.author}</div>
              <div className={styles["novella-list-novel-genres"]}>{novella.genres}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NovellaList; 