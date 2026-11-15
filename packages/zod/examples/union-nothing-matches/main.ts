// A contact is an email or a phone: lanes show each option's verdict, the union reports both
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { unionLanes } from '../../shared/union-lanes.ts';
import { codeLine } from '../../shared/widgets.ts';

const Email = z.email();
const Phone = z.e164();
const Contact = z.union([Email, Phone]);

const SAMPLES = [
  { label: 'an email', value: 'ada@example.com' },
  { label: 'a phone', value: '+358401234567' },
  { label: 'neither', value: 'call me maybe' },
  { label: 'a number', value: 358401234567 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a value: every option is tried until one accepts it.' });
  codeLine(stage.root, 'z.union([z.email(), z.e164()])');
  const lanes = unionLanes(stage.root, stage, [
    { label: 'z.email()', schema: Email },
    { label: 'z.e164()', schema: Phone },
  ]);
  drive(stage, SAMPLES, (input) => {
    const result = Contact.safeParse(input);
    lanes.show(input, result);
    if (result.success) stage.say('✓ The first option that fits wins; the rest are not tried', 'ok');
    else {
      // One invalid_union issue holds a list of issues for every option.
      const issue = result.error.issues[0] as { errors?: unknown[][] };
      stage.say(`✗ No option fits: one issue, with ${issue.errors?.length ?? 0} lists of reasons (one per option)`, 'bad');
    }
  });
  return stage.dispose;
};

export default mount;
