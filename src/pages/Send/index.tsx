import { Link } from "react-router-dom";

import BalanceBox from "../../components/BalanceBox";
import TransferBox from "./TransferBox";

import { routes } from "src/const";

import styles from "./Send.module.scss";

function Send() {
  return (
    <div className={styles.Send}>
      <div className={styles.TitleBar}>
        <div className={styles.Title}>SEND</div>
        <Link to={routes.index} className={styles.Ecks}>
          X
        </Link>
      </div>
      <BalanceBox />
      <TransferBox />
    </div>
  );
}

export default Send;
