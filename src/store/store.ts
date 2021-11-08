import create from "zustand";
import { AppState } from "../types/index";

const useStore = create<AppState>((set) => ({
  currentStep: {
    current: "welcome",
  },
  setCurrentStep: ({ current, previous }) =>
    set({
      currentStep: {
        current,
        previous,
      },
    }),
  authToken: null,
  setAuthToken: (token) => set({ authToken: token }),
  etherKey: null,
  setEtherKey: (key) => set({ etherKey: key }),
  identity: null,
  setIdentity: (identityPkg) => set({ identity: identityPkg }),
  isUserLoggedIn: false,
  setIsUserLoggedIn: (state: boolean) => set({ isUserLoggedIn: state }),
  isCreateNewWalllet: false,
  setCreateNewWallet: (state: boolean) => set({ isCreateNewWalllet: state }),
  isLoggerActive: false,
  setIsLoggerActive: (state: boolean) => set({ isLoggerActive: state }),
  setUser: (user) => set({ user }),
  currentToken: "conx",
  setCurrentToken: (token) => set({ currentToken: token }),
  currentNetwork: "testnet",
  setCurrentNetwork: (network) => set({ currentNetwork: network }),
  recentTransactions: [],
  setRecentTransactions: (transactions) =>
    set({ recentTransactions: transactions }),
  needPassword: false,
  setNeedPassword: (state: boolean) => {
    set({ needPassword: state });
  },
}));

export default useStore;
