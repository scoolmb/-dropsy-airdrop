import {
  Address,
  getAddressEncoder,
  getProgramDerivedAddress,
  ProgramDerivedAddressBump,
  ReadonlyUint8Array,
} from "@solana/kit";
import { DROPSY_PROGRAM_ADDRESS } from "../programs";
import { airdropSeed, claimMapSeed, controllerSeed, feeVaultSeed, masterSeed, statsSeed } from "../constants";

export type DropsyPda = readonly [Address<string>, ProgramDerivedAddressBump];
type Seed = ReadonlyUint8Array | string;

export async function getDropsyDerivedAddress(
  seeds: Seed[]
): Promise<DropsyPda> {
  return await getProgramDerivedAddress({
    seeds,
    programAddress: DROPSY_PROGRAM_ADDRESS,
  });
}

export async function getMasterDerivedAddress(): Promise<DropsyPda> {
  return await getDropsyDerivedAddress([Buffer.from(masterSeed)]);
}

export async function getStatsDerivedAddress(): Promise<DropsyPda> {
  return await getDropsyDerivedAddress([Buffer.from(statsSeed)]);
}

export async function getControllerDerivedAddress(
  authority: Address
): Promise<DropsyPda> {
  const seeds = [
    Buffer.from(controllerSeed),
    getAddressEncoder().encode(authority),
  ];
  return await getDropsyDerivedAddress(seeds);
}

export async function getAirdropDerivedAddress(
  authority: Address,
  mint: Address
): Promise<DropsyPda> {
  const seeds = [
    Buffer.from(airdropSeed),
    getAddressEncoder().encode(mint),
    getAddressEncoder().encode(authority),
  ];
  return await getDropsyDerivedAddress(seeds);
}

export async function getControllerVaultAddress(
  controller: Address
): Promise<DropsyPda> {
  const seeds = [Buffer.from(feeVaultSeed), getAddressEncoder().encode(controller)];
  return await getDropsyDerivedAddress(seeds);
}

export async function getClaimMapAddress(
  airdrop: Address,
  id: number
): Promise<DropsyPda> {
  const seeds = [
    Buffer.from(claimMapSeed),
    getAddressEncoder().encode(airdrop),
    Buffer.from([id]),
  ];
  return await getDropsyDerivedAddress(seeds);
}
