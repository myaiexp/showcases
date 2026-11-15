// z.xor: a contact with an email or a phone passes; both or neither is rejected
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { unionLanes } from '../../shared/union-lanes.ts';
import { codeLine } from '../../shared/widgets.ts';

const ByEmail = z.object({ email: z.email() });
const ByPhone = z.object({ phone: z.e164() });
// Exactly one option must match.
const Contact = z.xor([ByEmail, ByPhone]);

const SAMPLES = [
  { label: 'email only', value: { email: 'ada@example.com' } },
  { label: 'phone only', value: { phone: '+358401234567' } },
  { label: 'both', value: { email: 'ada@example.com', phone: '+358401234567' } },
  { label: 'neither', value: {} },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fill in both and the union rejects it: two options matched.' });
  codeLine(stage.root, 'z.xor([z.object({ email }), z.object({ phone })])');
  const lanes = unionLanes(
    stage.root,
    stage,
    [
      { label: '{ email }', schema: ByEmail },
      { label: '{ phone }', schema: ByPhone },
    ],
    { mode: 'all' },
  );
  drive(stage, SAMPLES, (input) => {
    const result = Contact.safeParse(input);
    lanes.show(input, result);
    if (result.success) stage.say('✓ Exactly one option matched', 'ok');
    else {
      const matches = (result.error.issues[0] as { matches?: number[] }).matches;
      stage.say(matches?.length ? `✗ Options ${matches.map((m) => m + 1).join(' and ')} both matched: xor wants exactly one` : '✗ No option matched', 'bad');
    }
  });
  return stage.dispose;
};

export default mount;
