import { useHistory } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "../../../../components/Button";
import Input from "../../../../components/Form/Input";
import Modal from "../../../../components/Modal";
import Divider from "../../../../components/Divider";
import Tooltip from "../../../../components/Tooltip";
import { Transaction } from "..";

import useCurrentToken from "../../../../hooks/crypto/useCurrentToken";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useTransactionList from "../../../../hooks/useTransactionList";
import useTransferCon from "../../../../hooks/crypto/useTransferCon";
import useTransferConx from "../../../../hooks/crypto/useTransferConx";
import useTransferEth from "../../../../hooks/crypto/useTransferEth";
import useVerifyPW from "../../../../hooks/useVerifyPW";

import useStore from "../../../../store/store";

import truncateString from "../../../../helpers/truncateString";

import { Token } from "../../../../types/index";

import { ReactComponent as ArrowIcon } from "../../../../assets/icons/arrow-right.svg";
import { ReactComponent as InfoIcon } from "../../../../assets/icons/info-icon.svg";

import styles from "./TransactionSummary.module.scss";
import { routes } from "src/const";

interface TransactionSummaryProps {
  isOpen: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

const GAS_FEE_DIVIDEND = 1000000000;

function Total({
  token,
  amount,
  gasFee,
}: {
  token: Token;
  amount: string | undefined;
  gasFee: number;
}) {
  if (token === "conx") {
    return <span className={styles.GasValue}>{amount} CONX</span>;
  }

  if (token === "con") {
    return (
      <span
        className={styles.TotalAmount}
      >{`${amount} ${token.toLocaleUpperCase()} + ${gasFee.toFixed(
        6
      )} ETH`}</span>
    );
  }

  return (
    <span className={styles.TotalAmount}>
      {(gasFee + Number(amount)).toFixed(6)} ETH
    </span>
  );
}

function TransactionSummary({
  transaction,
  isOpen,
  onClose,
}: TransactionSummaryProps) {
  const history = useHistory();

  const { currentUser } = useCurrentUser();
  const token = useCurrentToken();
  const { verify } = useVerifyPW();

  const { transferCon, isLoading } = useTransferCon();
  const { transferEth, isLoading: isLoadingEth } = useTransferEth();
  const { transferConx, isLoading: isLoadingConx } = useTransferConx();

  const needPassword = useStore((state) => state.needPassword);
  const logger = useStore((state) => state.loggerInstance);
  const currentNetwork = useStore((state) => state.currentNetwork);

  const [isSummaryOpen, setSummaryOpen] = useState(true);
  const [password, setPassword] = useState("");

  const { addTransaction } = useTransactionList();

  const onValidateAndConfirm = async () => {
    try {
      const verifySuccess: any = await verify(password);
      if (verifySuccess) {
        onConfirm();
      }
    } catch (error: any) {
      logger?.sendLog({
        logTarget: "ValidateTransaction",
        tags: ["test"],
        level: "ERROR",
        message: error,
      });
      toast.error(error?.response?.data?.payload ?? "Sorry an error happened");
    }
  };

  const changePage = () => {
    setSummaryOpen(false);
  };

  const onConfirm = async () => {
    if (transaction) {
      let txHash;
      if (token.token === "con") {
        txHash = await transferCon({
          amount: transaction?.amount,
          to: transaction?.to,
          gasLimit: String(transaction.gasLimit),
          gasPrice: String(transaction.gasPrice),
          network: currentNetwork,
        });
      }

      if (token.token === "eth") {
        txHash = await transferEth({
          amount: transaction.amount,
          to: transaction.to,
          gasLimit: String(transaction.gasLimit),
          gasPrice: String(transaction.gasPrice),
          network: currentNetwork,
        });
      }

      if (token.token === "conx") {
        txHash = await transferConx({
          value: transaction.amount,
          toAddress: transaction.to,
        });
      }

      addTransaction({
        txType: "send",
        hash: txHash,
        token: token?.token,
        to: transaction.to,
        amount: Number(transaction?.amount),
        date: new Date().toISOString(),
        status: token.token === "conx" ? "success" : "pending",
        network: currentNetwork,
      });

      history.push(routes.index);
    }
  };

  const gasFee =
    (Number(transaction?.gasPrice ?? 0) * Number(transaction?.gasLimit ?? 0)) /
    GAS_FEE_DIVIDEND;

  return (
    <>
      {isSummaryOpen ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title="Transaction Summary"
          className={styles.TransactionSummary}
        >
          <p className={styles.ReviewText}>
            Please review the details, and if everything is correct, click
            confirm.
          </p>
          <div className={styles.AmountBox}>
            <div className={styles.TokenBox}>
              <p className={styles.TokenName}>{token?.token}</p>
            </div>
            <div className={styles.AmountContainer}>
              <span className={styles.Label}>Amount</span>
              <span className={styles.Amount}>{transaction?.amount}</span>
            </div>
          </div>
          <div className={styles.FromToBox}>
            <Input
              mini
              label="from"
              value={truncateString(currentUser?.walletAddress ?? "", 12)}
            />
            <ArrowIcon className={styles.ArrowIcon} />
            <Input
              mini
              label="to"
              value={truncateString(transaction?.to ?? "", 12)}
            />
          </div>
          <Divider />
          <div className={styles.EstimatedGasBox}>
            <div className={styles.GasLabel}>
              <span className={styles.Text}>Estimated Gas Fee</span>
              <Tooltip id="info">
                <InfoIcon
                  data-for="info"
                  data-tip="Gas fees are paid to crypto miners who process transactions on the CONUN network. METACON does not profit from gas fees."
                  className={styles.InfoIcon}
                />
              </Tooltip>
            </div>
            <div className={styles.GasValueBox}>
              {token?.token === "conx" ? (
                <span className={styles.GasValue}>N/A</span>
              ) : (
                <span className={styles.GasValue}>{gasFee.toFixed(6)} ETH</span>
              )}
            </div>
          </div>
          <Divider />
          <div className={styles.TotalBox}>
            <div className={styles.LabelBox}>
              <span className={styles.Label}>Total</span>
              <span className={styles.SubLabel}>Amount + gas fee</span>
            </div>

            <Total
              token={token?.token}
              amount={transaction?.amount}
              gasFee={gasFee}
            />
          </div>
          <div className={styles.ButtonsContainer}>
            <Button type="button" onClick={onClose} variant="secondary">
              Reject
            </Button>
            <Button
              type="button"
              onClick={needPassword ? changePage : onConfirm}
              loading={isLoading || isLoadingConx || isLoadingEth}
              disabled={isLoading || isLoadingConx || isLoadingEth}
            >
              Confirm
            </Button>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title="Verify Yourself"
          className={styles.PasswordVerification}
        >
          <p className={styles.Description}>
            Please enter your password to proceed with the transaction.
          </p>
          <Input
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InfoIcon className={styles.InfoIcon} />
          <div className={styles.PasswordVerificationButtonContainer}>
            <Button
              size="smaller"
              variant="secondary"
              onClick={() => setSummaryOpen(true)}
            >
              NO
            </Button>
            <Button size="smaller" onClick={onValidateAndConfirm}>
              YES
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
export default TransactionSummary;
