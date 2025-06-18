import {
  address,
  createKeyPairSignerFromBytes,
  sendTransactionWithoutConfirmingFactory,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import * as dropsy from "../src";



const masterPda = address("DN6YXtVJiwMW7H4Le1ehsBimihopvU6xdxL5fLTcf8Ez");
const controller = address("2qJkRtZ1af63pe8tZWLaKCVYm24To6wWCZj3vkk8dpop");
const feeVault = address("BtjQcFXEA3qQ51JcmKCgHDKBooKW7pCM7iukfAr5cuW9");

const main = async () => {
  const client = dropsy.createDefaultSolanaClient();
  //const signer = await dropsy.generateKeyPairSignerWithSol(client);
  const authority = await createKeyPairSignerFromBytes(
    new Uint8Array(
      // prettier-ignore
      [73, 125, 30, 111, 228, 236, 221, 13, 205, 173, 49, 230, 85, 142, 16, 179, 148, 10, 6, 13, 81, 140, 125, 62, 198, 211, 222, 229, 8, 70, 179, 2, 173, 2, 219, 192, 135, 210, 20, 23, 44, 101, 212, 179, 10, 2, 50, 56, 93, 49, 16, 131, 134, 121, 193, 82, 192, 70, 88, 196, 152, 75, 26, 22]
    )
  );

  const instruction = dropsy.getWithdrawControllerFeesInstruction({
    master: masterPda,
    controller: controller,
    feeVault: feeVault,
    authority: authority,
    amount: 500,
  })

  const transactionMessage =
    await dropsy.createTransactionMessageFromInstruction(
      client.rpc,
      authority,
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
  console.log("feeVault  : ", feeVault);
};

main();
