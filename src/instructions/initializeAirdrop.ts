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
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getI64Decoder,
  getI64Encoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
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
import {
  expectAddress,
  expectSome,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';

export const INITIALIZE_AIRDROP_DISCRIMINATOR = new Uint8Array([
  96, 196, 74, 102, 61, 195, 48, 184,
]);

export function getInitializeAirdropDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    INITIALIZE_AIRDROP_DISCRIMINATOR
  );
}

export type InitializeAirdropInstruction<
  TProgram extends string = typeof DROPSY_PROGRAM_ADDRESS,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountAirdrop extends string | IAccountMeta<string> = string,
  TAccountController extends string | IAccountMeta<string> = string,
  TAccountFeeVault extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountTreasury extends
    | string
    | IAccountMeta<string> = 'DHffy4rNMtuL8VKgyBEay4jcq8AYHyoAzxLKU6aEijUV',
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountAirdrop extends string
        ? WritableAccount<TAccountAirdrop>
        : TAccountAirdrop,
      TAccountController extends string
        ? WritableAccount<TAccountController>
        : TAccountController,
      TAccountFeeVault extends string
        ? WritableAccount<TAccountFeeVault>
        : TAccountFeeVault,
      TAccountOwner extends string
        ? WritableSignerAccount<TAccountOwner> &
            IAccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountTreasury extends string
        ? WritableAccount<TAccountTreasury>
        : TAccountTreasury,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeAirdropInstructionData = {
  discriminator: ReadonlyUint8Array;
  id: bigint;
  merkleRoot: Array<number>;
  startsTime: bigint;
  endTime: bigint;
};

export type InitializeAirdropInstructionDataArgs = {
  id: number | bigint;
  merkleRoot: Array<number>;
  startsTime: number | bigint;
  endTime: number | bigint;
};

export function getInitializeAirdropInstructionDataEncoder(): Encoder<InitializeAirdropInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['id', getU64Encoder()],
      ['merkleRoot', getArrayEncoder(getU8Encoder(), { size: 32 })],
      ['startsTime', getI64Encoder()],
      ['endTime', getI64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: INITIALIZE_AIRDROP_DISCRIMINATOR })
  );
}

export function getInitializeAirdropInstructionDataDecoder(): Decoder<InitializeAirdropInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['id', getU64Decoder()],
    ['merkleRoot', getArrayDecoder(getU8Decoder(), { size: 32 })],
    ['startsTime', getI64Decoder()],
    ['endTime', getI64Decoder()],
  ]);
}

export function getInitializeAirdropInstructionDataCodec(): Codec<
  InitializeAirdropInstructionDataArgs,
  InitializeAirdropInstructionData
> {
  return combineCodec(
    getInitializeAirdropInstructionDataEncoder(),
    getInitializeAirdropInstructionDataDecoder()
  );
}

export type InitializeAirdropAsyncInput<
  TAccountMint extends string = string,
  TAccountAirdrop extends string = string,
  TAccountController extends string = string,
  TAccountFeeVault extends string = string,
  TAccountOwner extends string = string,
  TAccountTreasury extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  mint: Address<TAccountMint>;
  airdrop?: Address<TAccountAirdrop>;
  controller: Address<TAccountController>;
  feeVault: Address<TAccountFeeVault>;
  owner: TransactionSigner<TAccountOwner>;
  treasury?: Address<TAccountTreasury>;
  systemProgram?: Address<TAccountSystemProgram>;
  id: InitializeAirdropInstructionDataArgs['id'];
  merkleRoot: InitializeAirdropInstructionDataArgs['merkleRoot'];
  startsTime: InitializeAirdropInstructionDataArgs['startsTime'];
  endTime: InitializeAirdropInstructionDataArgs['endTime'];
};

export async function getInitializeAirdropInstructionAsync<
  TAccountMint extends string,
  TAccountAirdrop extends string,
  TAccountController extends string,
  TAccountFeeVault extends string,
  TAccountOwner extends string,
  TAccountTreasury extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof DROPSY_PROGRAM_ADDRESS,
>(
  input: InitializeAirdropAsyncInput<
    TAccountMint,
    TAccountAirdrop,
    TAccountController,
    TAccountFeeVault,
    TAccountOwner,
    TAccountTreasury,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  InitializeAirdropInstruction<
    TProgramAddress,
    TAccountMint,
    TAccountAirdrop,
    TAccountController,
    TAccountFeeVault,
    TAccountOwner,
    TAccountTreasury,
    TAccountSystemProgram
  >
> {
  // Program address.
  const programAddress = config?.programAddress ?? DROPSY_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    mint: { value: input.mint ?? null, isWritable: false },
    airdrop: { value: input.airdrop ?? null, isWritable: true },
    controller: { value: input.controller ?? null, isWritable: true },
    feeVault: { value: input.feeVault ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: true },
    treasury: { value: input.treasury ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.airdrop.value) {
    accounts.airdrop.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([97, 105, 114, 100, 114, 111, 112])
        ),
        getAddressEncoder().encode(expectAddress(accounts.mint.value)),
        getAddressEncoder().encode(expectAddress(accounts.owner.value)),
        getU64Encoder().encode(expectSome(args.id)),
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
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.airdrop),
      getAccountMeta(accounts.controller),
      getAccountMeta(accounts.feeVault),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.treasury),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitializeAirdropInstructionDataEncoder().encode(
      args as InitializeAirdropInstructionDataArgs
    ),
  } as InitializeAirdropInstruction<
    TProgramAddress,
    TAccountMint,
    TAccountAirdrop,
    TAccountController,
    TAccountFeeVault,
    TAccountOwner,
    TAccountTreasury,
    TAccountSystemProgram
  >;

  return instruction;
}

export type InitializeAirdropInput<
  TAccountMint extends string = string,
  TAccountAirdrop extends string = string,
  TAccountController extends string = string,
  TAccountFeeVault extends string = string,
  TAccountOwner extends string = string,
  TAccountTreasury extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  mint: Address<TAccountMint>;
  airdrop: Address<TAccountAirdrop>;
  controller: Address<TAccountController>;
  feeVault: Address<TAccountFeeVault>;
  owner: TransactionSigner<TAccountOwner>;
  treasury?: Address<TAccountTreasury>;
  systemProgram?: Address<TAccountSystemProgram>;
  id: InitializeAirdropInstructionDataArgs['id'];
  merkleRoot: InitializeAirdropInstructionDataArgs['merkleRoot'];
  startsTime: InitializeAirdropInstructionDataArgs['startsTime'];
  endTime: InitializeAirdropInstructionDataArgs['endTime'];
};

export function getInitializeAirdropInstruction<
  TAccountMint extends string,
  TAccountAirdrop extends string,
  TAccountController extends string,
  TAccountFeeVault extends string,
  TAccountOwner extends string,
  TAccountTreasury extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof DROPSY_PROGRAM_ADDRESS,
>(
  input: InitializeAirdropInput<
    TAccountMint,
    TAccountAirdrop,
    TAccountController,
    TAccountFeeVault,
    TAccountOwner,
    TAccountTreasury,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): InitializeAirdropInstruction<
  TProgramAddress,
  TAccountMint,
  TAccountAirdrop,
  TAccountController,
  TAccountFeeVault,
  TAccountOwner,
  TAccountTreasury,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? DROPSY_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    mint: { value: input.mint ?? null, isWritable: false },
    airdrop: { value: input.airdrop ?? null, isWritable: true },
    controller: { value: input.controller ?? null, isWritable: true },
    feeVault: { value: input.feeVault ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: true },
    treasury: { value: input.treasury ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

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
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.airdrop),
      getAccountMeta(accounts.controller),
      getAccountMeta(accounts.feeVault),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.treasury),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitializeAirdropInstructionDataEncoder().encode(
      args as InitializeAirdropInstructionDataArgs
    ),
  } as InitializeAirdropInstruction<
    TProgramAddress,
    TAccountMint,
    TAccountAirdrop,
    TAccountController,
    TAccountFeeVault,
    TAccountOwner,
    TAccountTreasury,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedInitializeAirdropInstruction<
  TProgram extends string = typeof DROPSY_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    mint: TAccountMetas[0];
    airdrop: TAccountMetas[1];
    controller: TAccountMetas[2];
    feeVault: TAccountMetas[3];
    owner: TAccountMetas[4];
    treasury: TAccountMetas[5];
    systemProgram: TAccountMetas[6];
  };
  data: InitializeAirdropInstructionData;
};

export function parseInitializeAirdropInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeAirdropInstruction<TProgram, TAccountMetas> {
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
      mint: getNextAccount(),
      airdrop: getNextAccount(),
      controller: getNextAccount(),
      feeVault: getNextAccount(),
      owner: getNextAccount(),
      treasury: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getInitializeAirdropInstructionDataDecoder().decode(instruction.data),
  };
}
