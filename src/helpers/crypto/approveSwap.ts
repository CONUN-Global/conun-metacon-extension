import { Transaction as Tx } from "ethereumjs-tx";
import { GAS_LIMIT_MULTIPLIER_FOR_SWAP } from "src/const";
import { Network } from "src/types";

import web3 from "src/web3";
import getConfig from "./getConfig";

type args = {
  walletAddress: string;
  amount: number;
  gasLimit: number;
  gasPrice: number;
  bufferedPrivateKey: Buffer;
  network:Network;
};

async function approveSwap({
  walletAddress,
  amount,
  gasLimit,
  gasPrice,
  bufferedPrivateKey,
  network,
  
}: args) {
  const configData = await getConfig();

  const networkChain = network === "testnet" ? "ropsten" : "mainnet"

  const conContract = new web3.eth.Contract(
    configData?.conContract?.abiRaw,
    configData?.conContract?.address
  );

  const approve = await conContract.methods
    .approve(
      configData?.bridgeContract.address,
      web3.utils.toWei(String(amount))
    )
    .encodeABI();

  const txCount = await web3.eth.getTransactionCount(walletAddress);

  const txObject = {
    from: walletAddress,
    to: configData?.conContract?.address,
    nonce: web3.utils.toHex(txCount),
    value: "0x0",
    gasLimit: web3.utils.toHex(gasLimit * GAS_LIMIT_MULTIPLIER_FOR_SWAP),
    gasPrice: web3.utils.toHex(
      web3.utils.toWei(String(gasPrice.toFixed(9)), "gwei")
    ),
    data: approve,
  };

  const tx = new Tx(txObject, { chain: networkChain });
  tx.sign(bufferedPrivateKey);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  return web3.eth.sendSignedTransaction(raw);
}

export default approveSwap;
