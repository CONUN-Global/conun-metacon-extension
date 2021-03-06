import { NetworkConfig } from "src/classes/networkConfig";
import generateReferrer from "src/helpers/chrome/generateReferrer";

import { ReactComponent as ConunLogo } from "../../../assets/icons/conun-logo.svg";
import MetaconDeer from "../../../assets/icons/metacon-deer.svg";

import styles from "./Welcome.module.scss";

function Welcome() {
  const referrer = generateReferrer();

  return (
    <div className={styles.Welcome}>
      <div className={styles.ColumnTop}>
        <img src={MetaconDeer} className={styles.Deer} alt="" />
        <p className={styles.Title}>Your crypto wallet organizer</p>
      </div>
      <div className={styles.ColumnBottom}>
        <a
          href={`${NetworkConfig.webAppUrl}?referrer=${referrer}`}
          target="_blank"
          rel="noreferrer"
          className={styles.Button}
        >
          Login / Sign Up
        </a>
        <ConunLogo className={styles.Logo} />
      </div>
    </div>
  );
}

export default Welcome;
