// A payment union keyed on "kind": only the chosen kind's fields are checked
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Payment = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('card'), number: z.string().regex(/^\d{16}$/, 'A card number is 16 digits'), cvc: z.string().regex(/^\d{3}$/, 'A CVC is 3 digits') }),
  z.object({ kind: z.literal('bank'), iban: z.string().min(15).max(34) }),
  z.object({ kind: z.literal('paypal'), email: z.email() }),
]);

const SAMPLES = [
  { label: 'good card', value: { kind: 'card', number: '4242424242424242', cvc: '123' } },
  { label: 'short card number', value: { kind: 'card', number: '4242', cvc: '123' } },
  { label: 'bank, no iban', value: { kind: 'bank' } },
  { label: 'paypal, bad email', value: { kind: 'paypal', email: 'ada@' } },
  { label: 'unknown kind', value: { kind: 'cash', amount: 20 } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change "kind" in the JSON: the fields that matter change with it.' });
  objectLab(stage, [{ label: 'payment', code: "z.discriminatedUnion('kind', [card, bank, paypal])", schema: Payment }], SAMPLES, {
    plan: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 0]],
    inTitle: 'Payment',
  });
  return stage.dispose;
};

export default mount;
