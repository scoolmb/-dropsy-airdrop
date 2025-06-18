import {
  address,
  createKeyPairSignerFromBytes,
  sendTransactionWithoutConfirmingFactory,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import * as dropsy from "../src";


const masterPda = address("DN6YXtVJiwMW7H4Le1ehsBimihopvU6xdxL5fLTcf8Ez");
const statsPda = address("DzBCLgwZfepkV9PqFRcuVmTwDjDjMxb4ymqC2kVGkmDa");
const airdropPda = address("5y41CfejMnuC4B4GRZzSgfDZvGh7V2W69ATs3G8LNJz3");


const main = async () => {
  const client = dropsy.createDefaultSolanaClient();
  //const signer = await dropsy.generateKeyPairSignerWithSol(client);
  const wallet = await createKeyPairSignerFromBytes(
    new Uint8Array(
      // prettier-ignore
      [124, 7, 78, 179, 222, 186, 151, 219, 91, 182, 224, 162, 163, 191, 157, 121, 36, 144, 24, 9, 158, 207, 90, 170, 236, 125, 104, 120, 52, 111, 154, 105, 69, 119, 213, 71, 205, 197, 107, 146, 92, 13, 133, 155, 225, 110, 27, 133, 147, 177, 174, 34, 119, 143, 219, 80, 194, 190, 126, 212, 146, 248, 221, 72]
    )
  );
  console.log("wallet :", wallet.address);

  const id = 0;
  const [claimMapPda, claimMapBump] = await dropsy.getClaimMapAddress(
    airdropPda,
    id
  );

  const instruction = dropsy.getInitializeBitmapInstruction({
    master: masterPda,
    stats: statsPda,
    airdrop: airdropPda,
    authority: wallet,
    bitmap: claimMapPda,
    id: id,
    total: 5000,
  });

  const transactionMessage =
    await dropsy.createTransactionMessageFromInstruction(
      client.rpc,
      wallet,
      instruction
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
  console.log("claimMap : ", claimMapPda);
};

main();
