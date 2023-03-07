import React from "react";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header__left}>Wish List</div>
      </div>
    </header>
  );
};
