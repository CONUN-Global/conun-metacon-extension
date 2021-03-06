import { useEffect } from "react";
import { Slide } from "pure-react-carousel";
import classNames from "classnames";

import Button from "../../../../components/Button";

import useCurrentUser from "../../../../hooks/useCurrentUser";
import useCurrentToken from "../../../../hooks/crypto/useCurrentToken";

import copyToClipboard from "../../../../helpers/copyToClipboard";

import { ReactComponent as ConunLogo } from "../../../../assets/icons/conun-white.svg";
import { ReactComponent as EthLogo } from "../../../../assets/icons/ethereum.svg";
import { ReactComponent as CopyIcon } from "../../../../assets/icons/copy-icon.svg";

import styles from "./TokenCard.module.scss";

interface TokenCardProps {
  token: {
    token: "con" | "conx" | "eth";
    useBalance: () => {
      balance:
        | {
            payload: string;
          }
        | undefined;
      loading: boolean;
      refetch: () => void;
      isFetching: boolean;
    };
  };
  i: number;
}

function Logo({ token }: { token: "con" | "conx" | "eth" }) {
  if (token === "eth") return <EthLogo className={styles.EthLogo} />;
  if (token === "con") return <ConunLogo className={styles.ConLogo} />;
  return <ConunLogo className={styles.ConxLogo} />;
}

function rectifyDecimal(num: number) {
  if (num.toFixed(6).length > 16) {
    return parseFloat(num.toFixed().slice(0, 16));
  }
  return parseFloat(num.toFixed(6));
}

function TokenCard({ token, i }: TokenCardProps) {
  const { currentUser } = useCurrentUser();
  const currentToken = useCurrentToken();
  const { balance, refetch } = token?.useBalance();

  useEffect(() => {
    if (currentToken?.token === token?.token) {
      refetch();
    }
  }, [currentToken]); //eslint-disable-line

  return (
    <Slide innerClassName={styles.CardContainer} index={i}>
      <div className={classNames(styles.Card, styles[token?.token])}>
        <div className={styles.Header}>
          <div className={styles.LogoBox}>
            <div className={styles.Logo}>
              <Logo token={token.token} />
            </div>
            <span className={styles.TokenLabel}>{token.token}</span>
          </div>
          <div className={styles.Name}>{currentUser?.name}</div>
        </div>
        <div className={styles.Balance}>
          {balance?.payload ? (
            <span className={styles.Number}>
              {rectifyDecimal(+balance?.payload)}
            </span>
          ) : (
            <span className={styles.Loading}>1234567890.0</span>
          )}
        </div>
        <div className={styles.Details}>
          <div className={styles.LabelLine}>
            <span className={styles.Label}>Wallet Address</span>
            <Button
              noStyle
              onClick={() => copyToClipboard(currentUser?.walletAddress)}
            >
              <CopyIcon className={styles.CopyIcon} />
            </Button>
          </div>
          <div>{currentUser?.walletAddress}</div>
        </div>
      </div>
    </Slide>
  );
}

export default TokenCard;
