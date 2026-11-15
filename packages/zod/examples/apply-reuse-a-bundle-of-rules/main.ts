// .apply(fn) runs a reusable function on a schema as part of the chain
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// One place that says what a percentage is.
function percentage<T extends z.ZodNumber>(schema: T) {
  return schema.min(0).max(100);
}

const Discount = z.number().apply(percentage);
const Battery = z.number().apply(percentage).nullable();
const Progress = z.number().int().apply(percentage);

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas: each shares the percentage rules.',
    inputs: [0, 55.5, 100, 101, -1, null],
    cardInputs: [55.5, 101, -1, null],
    inTitle: 'Value',
    outTitle: 'Result',
    noun: 'values',
    variants: [
      { label: 'Discount', code: 'z.number().apply(percentage)', schema: Discount, say: 'Between 0 and 100 passes; null is not a number' },
      { label: 'Battery', code: 'z.number().apply(percentage).nullable()', schema: Battery, say: 'The same rules, and null is allowed on top (no reading yet)' },
      { label: 'Progress', code: 'z.number().int().apply(percentage)', schema: Progress, say: 'The same rules after .int(), so 55.5 now fails too' },
    ],
  });

export default mount;
