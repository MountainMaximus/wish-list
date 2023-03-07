import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import { Preloader } from "../Preloader";
import styles from "./Wrapper.module.scss";

export const Wrapper: React.FC = () => {
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2300);
  }, []);
  return (
    <div className={styles.wrapper}>
      {load && <Preloader mask={true} />}
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
