// z.coerce.bigint() runs BigInt(input): whole numbers work, decimals do not
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const strict = z.bigint();
// BigInt(input): whole-number text and numbers convert, anything fractional throws.
const coerced = z.coerce.bigint();

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    types: true,
    inputs: ['9007199254740993', 42, '3.5', 'tuna', '', true, null],
    variants: [
      { label: 'z.bigint()', code: 'z.bigint()  // must already be a bigint', schema: strict },
      {
        label: 'z.coerce.bigint()',
        code: 'z.coerce.bigint()  // BigInt(input)',
        schema: coerced,
        say: (n, m) => `${n} of ${m} pass: text keeps every digit, but "3.5" fails, and "" and true quietly become 0n and 1n`,
      },
    ],
  });

export default mount;
