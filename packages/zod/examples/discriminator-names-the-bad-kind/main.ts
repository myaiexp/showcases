// Plain union vs discriminated union over the same options, on good, bad and unknown kinds
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inlineCompare } from '../../shared/inline-compare.ts';

const card = z.object({ kind: z.literal('card'), number: z.string().length(16) });
const bank = z.object({ kind: z.literal('bank'), iban: z.string().min(15) });
const paypal = z.object({ kind: z.literal('paypal'), email: z.email() });

const plain = z.union([card, bank, paypal]);
const keyed = z.discriminatedUnion('kind', [card, bank, paypal]);

const INPUTS: unknown[] = [
  { kind: 'paypal', email: 'ada@example.com' },
  { kind: 'bank', iban: 'FI21' },
  { kind: 'cash' },
  {},
];

const mount: Mount = (el, ctx) =>
  inlineCompare(el, ctx, {
    inputs: INPUTS,
    variants: [
      { label: 'z.union', code: 'z.union([card, bank, paypal])', schema: plain, say: (p, n) => `${p} of ${n} pass; an unknown kind only gets "Invalid input"` },
      { label: 'z.discriminatedUnion', code: "z.discriminatedUnion('kind', [card, bank, paypal])", schema: keyed, say: (p, n) => `${p} of ${n} pass; an unknown kind names the kinds that exist` },
    ],
    hint: 'Compare the reason on the last two rows.',
  });

export default mount;
