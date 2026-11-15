// stringToBigInt and numberToBigInt codecs, defined as the docs show
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const stringToBigInt = z.codec(z.string(), z.bigint(), {
  decode: (str) => BigInt(str),
  encode: (bigint) => bigint.toString(),
});
const numberToBigInt = z.codec(z.int(), z.bigint(), {
  decode: (num) => BigInt(num),
  encode: (bigint) => Number(bigint),
});

const S = 'stringToBigInt';
const N = 'numberToBigInt';

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: S,
    codec: stringToBigInt,
    samples: [
      { label: 'text id', value: '9007199254740993', code: S, say: '✓ this id is past what a number holds exactly; as a bigint it stays exact' },
      { label: 'text "abc"', value: 'abc', code: S, say: '✗ BigInt("abc") threw its own error: z.string() let it through, so no Zod issue came back' },
      { label: 'number 42', value: 42, codec: numberToBigInt, code: N },
      { label: 'number 2^60', value: 2 ** 60, codec: numberToBigInt, code: N, say: '✗ z.int() refuses numbers past the safe range before BigInt runs' },
      { label: 'encode a huge bigint', value: 2n ** 60n, dir: 'encode', codec: numberToBigInt, code: N, say: '✗ a bigint this large cannot go back to a number: the safe-integer check refuses it' },
    ],
  });

export default mount;
