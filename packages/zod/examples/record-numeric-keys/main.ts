// Number schemas as record keys: keys must be numeric strings, with the schema's limits
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inlineCompare } from '../../shared/inline-compare.ts';

const anyNumber = z.record(z.number(), z.string());
// Shelf numbers 0 to 10, whole numbers only.
const shelves = z.record(z.int().step(1).min(0).max(10), z.string());

const INPUTS: unknown[] = [{ 1: 'one', 2: 'two' }, { '1.5': 'one and a half', '-3': 'minus three' }, { 12: 'twelve' }, { abc: 'letters' }];

const mount: Mount = (el, ctx) =>
  inlineCompare(el, ctx, {
    inputs: INPUTS,
    variants: [
      { label: 'any number', code: 'z.record(z.number(), z.string())', schema: anyNumber, say: (p, n) => `${p} of ${n} pass; only a non-numeric key is refused` },
      { label: 'whole 0 to 10', code: 'z.record(z.int().step(1).min(0).max(10), z.string())', schema: shelves, say: (p, n) => `${p} of ${n} pass; "1.5", "-3" and "12" break the key rules` },
    ],
    hint: 'The same keys, judged by two key schemas.',
  });

export default mount;
