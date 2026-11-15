// record vs partialRecord with an enum key schema: exhaustive or not
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inlineCompare } from '../../shared/inline-compare.ts';

const Day = z.enum(['mon', 'tue', 'wed']);
const exhaustive = z.record(Day, z.string());
const partial = z.partialRecord(Day, z.string());

const INPUTS: unknown[] = [
  { mon: '9-17', tue: '9-17', wed: 'closed' },
  { mon: '9-17' },
  { mon: '9-17', tue: 9 },
  { mon: '9-17', tue: '9-17', wed: 'closed', sun: 'closed' },
];

const mount: Mount = (el, ctx) =>
  inlineCompare(el, ctx, {
    inputs: INPUTS,
    variants: [
      { label: 'z.record', code: "z.record(z.enum(['mon','tue','wed']), z.string())", schema: exhaustive, say: (p, n) => `${p} of ${n} pass; a missing day is an issue` },
      { label: 'z.partialRecord', code: "z.partialRecord(z.enum(['mon','tue','wed']), z.string())", schema: partial, say: (p, n) => `${p} of ${n} pass; days may be left out, strangers still fail` },
    ],
    hint: 'Same four opening-hours tables, with and without the exhaustive check.',
  });

export default mount;
