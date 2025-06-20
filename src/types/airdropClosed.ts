/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getI64Decoder,
  getI64Encoder,
  getStructDecoder,
  getStructEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export type AirdropClosed = {
  airdrop: Address;
  authority: Address;
  timestamp: bigint;
};

export type AirdropClosedArgs = {
  airdrop: Address;
  authority: Address;
  timestamp: number | bigint;
};

export function getAirdropClosedEncoder(): Encoder<AirdropClosedArgs> {
  return getStructEncoder([
    ['airdrop', getAddressEncoder()],
    ['authority', getAddressEncoder()],
    ['timestamp', getI64Encoder()],
  ]);
}

export function getAirdropClosedDecoder(): Decoder<AirdropClosed> {
  return getStructDecoder([
    ['airdrop', getAddressDecoder()],
    ['authority', getAddressDecoder()],
    ['timestamp', getI64Decoder()],
  ]);
}

export function getAirdropClosedCodec(): Codec<
  AirdropClosedArgs,
  AirdropClosed
> {
  return combineCodec(getAirdropClosedEncoder(), getAirdropClosedDecoder());
}
