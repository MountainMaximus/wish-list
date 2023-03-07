import React from "react";
import styles from "./Preloader.module.scss";

export const Preloader: React.FC<{ mask?: boolean }> = ({ mask }) => {
  return (
    <div className={`${mask ? styles.mask : ""}`}>
      <div className={styles.preloader}>
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
        {mask && <div className={styles.text}>Подождите, идет загрузка</div>}
      </div>
    </div>
  );
};
