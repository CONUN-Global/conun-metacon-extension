import { Link } from "react-router-dom";

import BalanceBox from "../../components/BalanceBox";
import SwapBox from "./SwapBox";

import { routes } from "src/const";

import styles from "./Swap.module.scss";

function Swap() {
  return (
    <div className={styles.Swap}>
      <div className={styles.TitleBar}>
        <div className={styles.Title}>SWAP</div>
        <Link to={routes.index} className={styles.Ecks}>
          X
        </Link>
      </div>
      <BalanceBox />
      <SwapBox />
    </div>
  );
}

export default Swap;
