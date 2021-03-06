import { NetworkOptions } from "src/types";
import useGetConBalance from "../hooks/crypto/useGetConBalance";
import useGetConTokenBalance from "../hooks/crypto/useGetConTokenBalance";
import useGetEthBalance from "../hooks/crypto/useGetEthBalance";

export const routes = {
  root: "/",
  index: "/",
  logout: "/logout",
  intro: "/intro",
  buy: "/buy",
  send: "/send",
  swap: "/swap",
};

export const LOGGER_NAME = "metacon-is-logger-active";

export const METACON_PRIVATE = "metacon-private";

export const METACON_IDENTITY = "metacon-indentity";

export const AUTH_TOKEN = "metacon-auth-token";

export const ORG_NAME = "Org1";

export const WALLET_TYPE = "ETH";

export const RECENT_TRANSACTIONS = "metacon-recent-transactions";

export const GAS_FEE_DIVIDEND = 1000000000;

export const PASSWORD_SECURITY = "password-security";
/**
 Temporary workaround to calculate gas limit for SWAP, can be changed once we find a way to calculate the gas limit dynamically
 **/
export const GAS_LIMIT_MULTIPLIER_FOR_SWAP = 5;

export const FcnTypes = {
  Transfer: "Transfer",
  Init: "Init",
  Mint: "Mint",
  Burn: "Burn",
  GetDetails: "GetDetails",
  BalanceOf: "BalanceOf",
};

type Token = {
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
  useGasEstimate?: () => {
    data: any;
    loading: boolean;
  };
};

export const TOKEN_CARDS: Token[] = [
  {
    token: "conx",
    useBalance: useGetConTokenBalance,
    useGasEstimate: () => ({ data: null, loading: false }),
  },
  {
    token: "eth",
    useBalance: useGetEthBalance,
  },
  {
    token: "con",
    useBalance: useGetConBalance,
  },
];

const testnetOptions: NetworkOptions[] = [
  {
    value: "testnet",
    label: "Conun Testnet",
  },
];

const mainnetOptions: NetworkOptions[] = [
  {
    value: "mainnet",
    label: "Conun Mainnet",
  },
];

// const allOptions = [...testnetOptions, ...mainnetOptions];

export const NETWORK_OPTIONS: NetworkOptions[] =
  process.env.REACT_APP_USE_TEST === "TRUE" ? testnetOptions : mainnetOptions;

export const extMsg = {
  WEBAPP_SEND_AUTH: "WEBAPP_SEND_AUTH",
  BKG_AUTH_KEY_RECEIVED: "BKH_AUTH_KEY_RECEIVED",

  WEBAPP_SEND_LOGIN: "WEBAPP_SEND_LOGIN",
  BKG_PACKAGE_RECEIVED: "BKG_PACKAGE_RECEIVED",

  WEBAPP_SEND_TXNS: "WEBAPP_SEND_TXNS",
  BKG_TXNS_RECEIVED: "BKG_TXNS_RECEIVED",

  EXT_LOGIN_PACKAGE_REQUEST: "EXT_LOGIN_PACKAGE_REQUEST",
  BKG_SEND_LOGIN_PACKAGE: "BKG_SEND_AUTH_KEY_PACKAGE",

  EXT_AUTH_REQUEST: "EXT_AUTH_REQUEST",
  BKG_SEND_AUTH_KEY: "BKG_SEND_AUTH_KEY",

  EXT_TXN_REQUEST: "EXT_TXN_REQUEST",
  BKG_SEND_TXNS: "BKG_SEND_TXNS",

  EXT_SEND_TXNS: "EXT_SEND_TXNS",
};

export const METACON_AUTH = "METACON_AUTH";
export const METACON_LOGIN = "METACON_LOGIN";
export const METACON_TXNS = "METACON_TXNS";
export const METACON_LOGGER_ACTIVE = "METACON_LOGGER_ACTIVE";
export const METACON_CONFIG = "METACON_CONFIG";
