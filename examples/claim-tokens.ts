import {
  address,
  createKeyPairSignerFromBytes,
  sendTransactionWithoutConfirmingFactory,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import * as dropsy from "../src";
import {
  findAssociatedTokenPda,
  getCreateAssociatedTokenIdempotentInstructionAsync,
  TOKEN_PROGRAM_ADDRESS
} from "@solana-program/token";
import MerkleTree from "merkletreejs";
import { createHash } from "crypto";


const airdropPda = address("5y41CfejMnuC4B4GRZzSgfDZvGh7V2W69ATs3G8LNJz3");
const mint = address("7o7iSykjiVBR6DKKtEdFsEukAmfp8e9gAXQCBiNQseSq");
const vault = address("EBog6Tsyvb1XK5A1innMhDvxmJCxqJL9zdTSDr1MCcWE");
const claimMap = address("8N3KQqh4QDjTys9ZmTixp1va5SNKQiaX7wpRewmXTdy5");
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
export const getMerkleProof = (
  merkleTree: MerkleTree,
  address: string,
  amount: number,
  index: number
): number[][] => {
  const leaf = hashLeaf(index, address, amount);
  const proof = merkleTree.getProof(leaf);

  return proof.map((p) => Array.from(p.data));
};
const main = async () => {
  const client = dropsy.createDefaultSolanaClient();

  const claimer = await createKeyPairSignerFromBytes(
    new Uint8Array(
      // prettier-ignore
      [73, 125, 30, 111, 228, 236, 221, 13, 205, 173, 49, 230, 85, 142, 16, 179, 148, 10, 6, 13, 81, 140, 125, 62, 198, 211, 222, 229, 8, 70, 179, 2, 173, 2, 219, 192, 135, 210, 20, 23, 44, 101, 212, 179, 10, 2, 50, 56, 93, 49, 16, 131, 134, 121, 193, 82, 192, 70, 88, 196, 152, 75, 26, 22]
    )
  );
  console.log("wallet :", claimer.address);
  const merkleTree = createMerkleTree(claimList);
  const claimProof = getMerkleProof(merkleTree, claimer.address, 500, 1);
  const id = 0;
  const [destinationTokenAccount, srcBump] = await findAssociatedTokenPda({
    owner: claimer.address,
    mint: mint,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  })

  // this instruction to create Associated token account for the claimer if not initialized 
  const destinationATACreateIx = await getCreateAssociatedTokenIdempotentInstructionAsync({
    ata: destinationTokenAccount,
    mint: mint,
    payer: claimer,
    owner: claimer.address,
  });
  const instruction = dropsy.getClaimTokensInstruction({
    vault: vault,
    destinationTokenAccount: destinationTokenAccount,
    airdrop: airdropPda,
    bitmap: claimMap,
    mint: mint,
    claimer: claimer,
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
    index: 1,
    amount: 500,
    proof: claimProof
  })
  const transactionMessage =
    await dropsy.createTransactionMessageFromInstruction(
      client.rpc,
      claimer,
      [instruction, destinationATACreateIx]
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
  console.log("destination ata  : ", destinationTokenAccount);
};

main();
