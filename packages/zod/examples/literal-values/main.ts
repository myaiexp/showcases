// z.literal() accepts one exact value: a word, number, bigint or true
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    types: true,
    outTitle: 'Zod says',
    variants: [
      { label: 'a word', code: 'z.literal("tuna")', schema: z.literal('tuna'), inputs: ['tuna', 'Tuna', 'tuna ', 'salmon', 42] },
      { label: 'a number', code: 'z.literal(12)', schema: z.literal(12), inputs: [12, '12', 12.5, 13, true] },
      { label: 'a bigint', code: 'z.literal(2n)', schema: z.literal(2n), inputs: [2n, 2, '2', 3n] },
      { label: 'true', code: 'z.literal(true)', schema: z.literal(true), inputs: [true, 'true', 1, false] },
    ],
  });

export default mount;
