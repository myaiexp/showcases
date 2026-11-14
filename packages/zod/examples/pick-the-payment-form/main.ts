// z.getDiscriminatedOption pulls one option out by its kind: its fields, its own check
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, note } from '../../shared/widgets.ts';

const Payment = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('card'), number: z.string().length(16), cvc: z.string().length(3) }),
  z.object({ kind: z.literal('bank'), iban: z.string().min(15), holder: z.string().min(1) }),
  z.object({ kind: z.literal('paypal'), email: z.email() }),
]);

type Kind = 'card' | 'bank' | 'paypal';
const SAMPLES: { label: string; value: { kind: Kind; [k: string]: unknown } }[] = [
  { label: 'card form', value: { kind: 'card', number: '4242424242424242', cvc: '12' } },
  { label: 'bank form', value: { kind: 'bank', iban: 'FI2112345600000785', holder: '' } },
  { label: 'paypal form', value: { kind: 'paypal', email: 'ada@example.com' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a form: the option for that kind is fetched and used alone.' });
  const code = codeLine(stage.root, '');
  const fields = stage.preview ? null : note(stage.root);
  const check = checkpoint(stage.root, stage, { label: 'option.safeParse', messages: !stage.preview });
  drive(stage, SAMPLES, (value) => {
    const input = value as (typeof SAMPLES)[number]['value'];
    // Returns the option as it was declared, so .shape works.
    const option = z.getDiscriminatedOption(Payment, input.kind)!;
    code.textContent = `z.getDiscriminatedOption(Payment, '${input.kind}')`;
    if (fields) fields.textContent = `The ${input.kind} form asks for: ${Object.keys(option.shape).filter((k) => k !== 'kind').join(', ')}`;
    const result = option.safeParse(input);
    check.show(input, result);
    if (result.success) stage.say('✓ The form is complete', 'ok');
    else stage.say(`✗ ${result.error.issues.map((i) => i.path.join('.')).join(', ')} is not right for the ${input.kind} form`, 'bad');
  });
  return stage.dispose;
};

export default mount;
