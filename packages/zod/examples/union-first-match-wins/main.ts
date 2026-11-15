// The same two union options in two orders: the first success decides the output
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// z.coerce.number() accepts "42" by converting it, so whichever comes first claims the input.
const numberFirst = z.union([z.coerce.number(), z.string()]);
const stringFirst = z.union([z.string(), z.coerce.number()]);

const INPUTS: unknown[] = ['42', 'hello', 42, '', true];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    types: true,
    variants: [
      { label: 'number first', code: 'z.union([z.coerce.number(), z.string()])', schema: numberFirst, say: () => '"42" is claimed by the number option, so it comes out as a number' },
      { label: 'string first', code: 'z.union([z.string(), z.coerce.number()])', schema: stringFirst, say: () => '"42" is claimed by the string option and stays text' },
    ],
    hint: 'Pick an order and watch the output types.',
  });

export default mount;
