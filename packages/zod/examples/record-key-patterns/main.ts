// A record whose keys must be lowercase words: strict rejects other keys, loose passes them
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inlineCompare } from '../../shared/inline-compare.ts';

const lower = z.string().regex(/^[a-z]+$/, 'lowercase letters only');
const strict = z.record(lower, z.number());
const loose = z.looseRecord(lower, z.number());

const INPUTS: unknown[] = [{ apples: 3, pears: 5 }, { apples: 3, Pears: 5 }, { apples: 3, kiwi2: 1 }, { apples: 'many' }];

const mount: Mount = (el, ctx) =>
  inlineCompare(el, ctx, {
    inputs: INPUTS,
    variants: [
      { label: 'z.record', code: 'z.record(z.string().regex(/^[a-z]+$/), z.number())', schema: strict, say: (p, n) => `${p} of ${n} pass; "Pears" and "kiwi2" are refused as keys` },
      { label: 'z.looseRecord', code: 'z.looseRecord(z.string().regex(/^[a-z]+$/), z.number())', schema: loose, say: (p, n) => `${p} of ${n} pass; odd keys slip through, matching keys still need number values` },
    ],
    hint: 'Pick the record kind to see what happens to the odd keys.',
  });

export default mount;
