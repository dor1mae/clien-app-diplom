import React from "react";
import styles from "./PopularUpdates.module.css";

const demoItems = Array(6).fill({ title: "Название какой-то новеллы" });

const PopularUpdates = () => {
  return (
    <div className={styles["popular-updates-box"]}>
      <div className={styles["popular-updates-scroll"]}>
        {demoItems.map((item, idx) => (
          <div className={styles["popular-updates-item"]} key={idx}>
            <div className={styles["popular-updates-cover"]} />
            <div className={styles["popular-updates-novel-title"]}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularUpdates; 