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
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export type BitmapInitialized = {
  airdrop: Address;
  bitmap: Address;
  bitmapId: number;
  totalClaims: bigint;
};

export type BitmapInitializedArgs = {
  airdrop: Address;
  bitmap: Address;
  bitmapId: number;
  totalClaims: number | bigint;
};

export function getBitmapInitializedEncoder(): Encoder<BitmapInitializedArgs> {
  return getStructEncoder([
    ['airdrop', getAddressEncoder()],
    ['bitmap', getAddressEncoder()],
    ['bitmapId', getU8Encoder()],
    ['totalClaims', getU64Encoder()],
  ]);
}

export function getBitmapInitializedDecoder(): Decoder<BitmapInitialized> {
  return getStructDecoder([
    ['airdrop', getAddressDecoder()],
    ['bitmap', getAddressDecoder()],
    ['bitmapId', getU8Decoder()],
    ['totalClaims', getU64Decoder()],
  ]);
}

export function getBitmapInitializedCodec(): Codec<
  BitmapInitializedArgs,
  BitmapInitialized
> {
  return combineCodec(
    getBitmapInitializedEncoder(),
    getBitmapInitializedDecoder()
  );
}
