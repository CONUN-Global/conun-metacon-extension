import { useMutation } from "react-query";

import useCurrentUser from "../useCurrentUser";

import approveSwap from "../../helpers/crypto/approveSwap";
import despositTokens from "../../helpers/crypto/depositTokens";

import web3 from "src/web3";
import useStore from "src/store/store";

type Args = {
  amount: number;
  gasLimit: number;
  gasPrice: number;
};

const useSwapFromCon = () => {
  const { currentUser } = useCurrentUser();
  const etherKey = useStore((state) => state.etherKey);
  const currentNetwork = useStore((state) => state.currentNetwork);

  const { mutateAsync: swapFromCon, isLoading } = useMutation(
    async (args: Args) => {
      const from = currentUser?.walletAddress;

      web3.eth.defaultAccount = from!;

      let formattedPrivateKey = etherKey || "";

      if (formattedPrivateKey.includes("0x")) {
        formattedPrivateKey = formattedPrivateKey.slice(
          2,
          formattedPrivateKey.length
        );
      }

      const bufferedPrivateKey = Buffer.from(formattedPrivateKey, "hex");
      await approveSwap({
        walletAddress: currentUser?.walletAddress!,
        bufferedPrivateKey,
        amount: args.amount,
        gasPrice: args.gasPrice,
        gasLimit: args.gasLimit,
        network: currentNetwork,
      });

      const transaction = await despositTokens({
        walletAddress: currentUser?.walletAddress!,
        bufferedPrivateKey,
        amount: args.amount,
        gasPrice: args.gasPrice,
        gasLimit: args.gasLimit,
        network: currentNetwork,
      });
      return transaction;
    }
  );

  return { swapFromCon, isLoading };
};

export default useSwapFromCon;
