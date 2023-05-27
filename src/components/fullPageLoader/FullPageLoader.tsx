import React from "react";
import loader from "../../assets/images/loader.svg";
import styles from "./fullPageLoader.module.scss";

const FullPageLoader = () => {
  return (
    <div className={styles.wrapper}>
      <img src={loader} alt="" />
    </div>
  );
};

export default FullPageLoader;
