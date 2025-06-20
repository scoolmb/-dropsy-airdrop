/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { DROPSY_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const CLOSE_BITMAP_DISCRIMINATOR = new Uint8Array([
  59, 123, 115, 204, 163, 227, 37, 118,
]);

export function getCloseBitmapDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    CLOSE_BITMAP_DISCRIMINATOR
  );
}

export type CloseBitmapInstruction<
  TProgram extends string = typeof DROPSY_PROGRAM_ADDRESS,
  TAccountMaster extends string | IAccountMeta<string> = string,
  TAccountStats extends string | IAccountMeta<string> = string,
  TAccountAirdrop extends string | IAccountMeta<string> = string,
  TAccountBitmap extends string | IAccountMeta<string> = string,
  TAccountTreasury extends
    | string
    | IAccountMeta<string> = 'DHffy4rNMtuL8VKgyBEay4jcq8AYHyoAzxLKU6aEijUV',
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMaster extends string
        ? ReadonlyAccount<TAccountMaster>
        : TAccountMaster,
      TAccountStats extends string
        ? WritableAccount<TAccountStats>
        : TAccountStats,
      TAccountAirdrop extends string
        ? WritableAccount<TAccountAirdrop>
        : TAccountAirdrop,
      TAccountBitmap extends string
        ? WritableAccount<TAccountBitmap>
        : TAccountBitmap,
      TAccountTreasury extends string
        ? WritableAccount<TAccountTreasury>
        : TAccountTreasury,
      TAccountAuthority extends string
        ? WritableSignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type CloseBitmapInstructionData = { discriminator: ReadonlyUint8Array };

export type CloseBitmapInstructionDataArgs = {};

export function getCloseBitmapInstructionDataEncoder(): Encoder<CloseBitmapInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: CLOSE_BITMAP_DISCRIMINATOR })
  );
}

export function getCloseBitmapInstructionDataDecoder(): Decoder<CloseBitmapInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getCloseBitmapInstructionDataCodec(): Codec<
  CloseBitmapInstructionDataArgs,
  CloseBitmapInstructionData
> {
  return combineCodec(
    getCloseBitmapInstructionDataEncoder(),
    getCloseBitmapInstructionDataDecoder()
  );
}

export type CloseBitmapAsyncInput<
  TAccountMaster extends string = string,
  TAccountStats extends string = string,
  TAccountAirdrop extends string = string,
  TAccountBitmap extends string = string,
  TAccountTreasury extends string = string,
  TAccountAuthority extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  master?: Address<TAccountMaster>;
  stats?: Address<TAccountStats>;
  airdrop: Address<TAccountAirdrop>;
  bitmap: Address<TAccountBitmap>;
  treasury?: Address<TAccountTreasury>;
  authority: TransactionSigner<TAccountAuthority>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export async function getCloseBitmapInstructionAsync<
  TAccountMaster extends string,
  TAccountStats extends string,
  TAccountAirdrop extends string,
  TAccountBitmap extends string,
  TAccountTreasury extends string,
  TAccountAuthority extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof DROPSY_PROGRAM_ADDRESS,
>(
  input: CloseBitmapAsyncInput<
    TAccountMaster,
    TAccountStats,
    TAccountAirdrop,
    TAccountBitmap,
    TAccountTreasury,
    TAccountAuthority,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  CloseBitmapInstruction<
    TProgramAddress,
    TAccountMaster,
    TAccountStats,
    TAccountAirdrop,
    TAccountBitmap,
    TAccountTreasury,
    TAccountAuthority,
    TAccountSystemProgram
  >
> {
  // Program address.
  const programAddress = config?.programAddress ?? DROPSY_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    master: { value: input.master ?? null, isWritable: false },
    stats: { value: input.stats ?? null, isWritable: true },
    airdrop: { value: input.airdrop ?? null, isWritable: true },
    bitmap: { value: input.bitmap ?? null, isWritable: true },
    treasury: { value: input.treasury ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.master.value) {
    accounts.master.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([109, 97, 115, 116, 101, 114, 51])
        ),
      ],
    });
  }
  if (!accounts.stats.value) {
    accounts.stats.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(new Uint8Array([115, 116, 97, 116, 115])),
      ],
    });
  }
  if (!accounts.treasury.value) {
    accounts.treasury.value =
      'DHffy4rNMtuL8VKgyBEay4jcq8AYHyoAzxLKU6aEijUV' as Address<'DHffy4rNMtuL8VKgyBEay4jcq8AYHyoAzxLKU6aEijUV'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.master),
      getAccountMeta(accounts.stats),
      getAccountMeta(accounts.airdrop),
      getAccountMeta(accounts.bitmap),
      getAccountMeta(accounts.treasury),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getCloseBitmapInstructionDataEncoder().encode({}),
  } as CloseBitmapInstruction<
    TProgramAddress,
    TAccountMaster,
    TAccountStats,
    TAccountAirdrop,
    TAccountBitmap,
    TAccountTreasury,
    TAccountAuthority,
    TAccountSystemProgram
  >;

  return instruction;
}

export type CloseBitmapInput<
  TAccountMaster extends string = string,
  TAccountStats extends string = string,
  TAccountAirdrop extends string = string,
  TAccountBitmap extends string = string,
  TAccountTreasury extends string = string,
  TAccountAuthority extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  master: Address<TAccountMaster>;
  stats: Address<TAccountStats>;
  airdrop: Address<TAccountAirdrop>;
  bitmap: Address<TAccountBitmap>;
  treasury?: Address<TAccountTreasury>;
  authority: TransactionSigner<TAccountAuthority>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getCloseBitmapInstruction<
  TAccountMaster extends string,
  TAccountStats extends string,
  TAccountAirdrop extends string,
  TAccountBitmap extends string,
  TAccountTreasury extends string,
  TAccountAuthority extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof DROPSY_PROGRAM_ADDRESS,
>(
  input: CloseBitmapInput<
    TAccountMaster,
    TAccountStats,
    TAccountAirdrop,
    TAccountBitmap,
    TAccountTreasury,
    TAccountAuthority,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): CloseBitmapInstruction<
  TProgramAddress,
  TAccountMaster,
  TAccountStats,
  TAccountAirdrop,
  TAccountBitmap,
  TAccountTreasury,
  TAccountAuthority,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? DROPSY_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    master: { value: input.master ?? null, isWritable: false },
    stats: { value: input.stats ?? null, isWritable: true },
    airdrop: { value: input.airdrop ?? null, isWritable: true },
    bitmap: { value: input.bitmap ?? null, isWritable: true },
    treasury: { value: input.treasury ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.treasury.value) {
    accounts.treasury.value =
      'DHffy4rNMtuL8VKgyBEay4jcq8AYHyoAzxLKU6aEijUV' as Address<'DHffy4rNMtuL8VKgyBEay4jcq8AYHyoAzxLKU6aEijUV'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.master),
      getAccountMeta(accounts.stats),
      getAccountMeta(accounts.airdrop),
      getAccountMeta(accounts.bitmap),
      getAccountMeta(accounts.treasury),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getCloseBitmapInstructionDataEncoder().encode({}),
  } as CloseBitmapInstruction<
    TProgramAddress,
    TAccountMaster,
    TAccountStats,
    TAccountAirdrop,
    TAccountBitmap,
    TAccountTreasury,
    TAccountAuthority,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedCloseBitmapInstruction<
  TProgram extends string = typeof DROPSY_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    master: TAccountMetas[0];
    stats: TAccountMetas[1];
    airdrop: TAccountMetas[2];
    bitmap: TAccountMetas[3];
    treasury: TAccountMetas[4];
    authority: TAccountMetas[5];
    systemProgram: TAccountMetas[6];
  };
  data: CloseBitmapInstructionData;
};

export function parseCloseBitmapInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCloseBitmapInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 7) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      master: getNextAccount(),
      stats: getNextAccount(),
      airdrop: getNextAccount(),
      bitmap: getNextAccount(),
      treasury: getNextAccount(),
      authority: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getCloseBitmapInstructionDataDecoder().decode(instruction.data),
  };
}
