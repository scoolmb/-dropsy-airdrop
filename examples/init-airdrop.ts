import {
  address,
  createKeyPairSignerFromBytes,
  sendTransactionWithoutConfirmingFactory,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import * as dropsy from "../src";
import { createHash } from "crypto";
import { MerkleTree } from "merkletreejs";

const statsPda = address("DzBCLgwZfepkV9PqFRcuVmTwDjDjMxb4ymqC2kVGkmDa");
const controller = address("2qJkRtZ1af63pe8tZWLaKCVYm24To6wWCZj3vkk8dpop");
const feeVault = address("BtjQcFXEA3qQ51JcmKCgHDKBooKW7pCM7iukfAr5cuW9");

const claimList = [
  {
    index: 0,
    address: "6TMmpVof9fGXak2VUgP4X9sXNfPHA7XWyi9ZMUCrHP6A",
    amount: 500,
  },
  {
    index: 1,
    address: "CeN4TqZaxMc9adCeCtE6VqfpwRbmt6DRYMnH41vv9V5F",
    amount: 500,
  },
];
function hashLeaf(index: number, address: string, amount: number): Buffer {
  const data = `${index}:${address}:${amount.toString()}`;
  return createHash("sha256").update(data).digest();
}

// Function to generate a Merkle Tree from a claim list
export const createMerkleTree = (
  claimList: { index: number; address: string; amount: number }[]
) => {
  const leaves = claimList.map(({ index, address, amount }) =>
    hashLeaf(index, address, amount)
  );

  const merkleTree = new MerkleTree(
    leaves,
    (data: any) => createHash("sha256").update(data).digest(),
    { sortPairs: true }
  );

  return merkleTree;
};
export const getMerkleRootArray = (merkleTree: MerkleTree): number[] => {
  const root = merkleTree.getRoot().toString("hex");
  const merkleRootBuffer = Buffer.from(root, "hex");
  if (merkleRootBuffer.length !== 32) {
    throw new Error("Merkle root must be 32 bytes");
  }
  const merkleRootArray = Array.from(merkleRootBuffer);
  return merkleRootArray;
};

const main = async () => {
  const client = dropsy.createDefaultSolanaClient();
  const wallet = await createKeyPairSignerFromBytes(
    new Uint8Array(
      // prettier-ignore
      [124, 7, 78, 179, 222, 186, 151, 219, 91, 182, 224, 162, 163, 191, 157, 121, 36, 144, 24, 9, 158, 207, 90, 170, 236, 125, 104, 120, 52, 111, 154, 105, 69, 119, 213, 71, 205, 197, 107, 146, 92, 13, 133, 155, 225, 110, 27, 133, 147, 177, 174, 34, 119, 143, 219, 80, 194, 190, 126, 212, 146, 248, 221, 72]
    )
  );

  const merkleTree = createMerkleTree(claimList);
  const merkleRootArray = getMerkleRootArray(merkleTree);

  const mint = address("7o7iSykjiVBR6DKKtEdFsEukAmfp8e9gAXQCBiNQseSq");
  const [airdropPda, airdropBump] = await dropsy.getAirdropDerivedAddress(
    wallet.address,
    mint
  );
  const ix = dropsy.getInitializeAirdropInstructionAsync({
    authority: wallet,
    mint: mint,
    controller: controller,
    merkleRoot: merkleRootArray,
    startsTime: null,
    endTime: null,

  })
  const instruction = dropsy.getInitializeAirdropInstruction({
    stats: statsPda,
    controller: controller,
    airdrop: airdropPda,
    mint: mint,
    authority: wallet,
    feeVault: feeVault,
    merkleRoot: merkleRootArray,
    startsTime: null,
    endTime: null,
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
  console.log("airdrop : ", airdropPda);
};

main();
