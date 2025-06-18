import {
  createKeyPairSignerFromBytes,
  sendTransactionWithoutConfirmingFactory,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import * as dropsy from "../src";


const main = async () => {
  const client = dropsy.createDefaultSolanaClient();
  const wallet = await createKeyPairSignerFromBytes(
    new Uint8Array(
      // prettier-ignore
      [73, 125, 30, 111, 228, 236, 221, 13, 205, 173, 49, 230, 85, 142, 16, 179, 148, 10, 6, 13, 81, 140, 125, 62, 198, 211, 222, 229, 8, 70, 179, 2, 173, 2, 219, 192, 135, 210, 20, 23, 44, 101, 212, 179, 10, 2, 50, 56, 93, 49, 16, 131, 134, 121, 193, 82, 192, 70, 88, 196, 152, 75, 26, 22]
    )
  );
  const [masterPda, masterBump] = await dropsy.getMasterDerivedAddress();
  const [statsPda, statsBump] = await dropsy.getStatsDerivedAddress();
  const [controllerPda, contrBump] = await dropsy.getControllerDerivedAddress(wallet.address);
  const [feeVault, feeVbump] = await dropsy.getControllerVaultAddress(controllerPda);

  const ix = await dropsy.getInitializeControllerInstructionAsync({
    authority: wallet,
    feeLamports: BigInt(5000),
  });
  const instruction = dropsy.getInitializeControllerInstruction({
    master: masterPda,
    stats: statsPda,
    controller: controllerPda,
    feeVault: feeVault,
    authority: wallet,
    feeLamports: BigInt(5000),
  });
  const transactionMessage =
    await dropsy.createTransactionMessageFromInstruction(
      client.rpc,
      wallet,
      [instruction]
    );
  const signedTransaction = await signTransactionMessageWithSigners(
    transactionMessage
  );
  const sendTransaction = sendTransactionWithoutConfirmingFactory({
    rpc: client.rpc,
  });
  try {
    await sendTransaction(signedTransaction, { commitment: "confirmed" });
  } catch (error) {
    console.log("error", error);
  }
  console.log("authority address :", wallet.address);
  console.log("controller : ", controllerPda);
  console.log("fee vault : ", feeVault);
};

main();
