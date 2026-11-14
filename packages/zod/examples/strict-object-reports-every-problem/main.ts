// A strict object checked with a stray key and a wrong value: both are reported
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, plural } from '../../shared/widgets.ts';

const Profile = z.strictObject({ username: z.string(), age: z.number() });

const SAMPLES = [
  { label: 'both mistakes', value: { username: 'ana', age: '31', nickname: 'a' } },
  { label: 'stray key only', value: { username: 'ana', age: 31, nickname: 'a' } },
  { label: 'wrong value only', value: { username: 'ana', age: '31' } },
  { label: 'clean', value: { username: 'ana', age: 31 } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a sample or edit the JSON below.' });
  codeLine(stage.root, 'z.strictObject({ username: z.string(), age: z.number() })');
  const check = checkpoint(stage.root, stage, { label: 'Profile.safeParse', messages: true });
  drive(
    stage,
    SAMPLES,
    (input) => {
      const result = Profile.safeParse(input);
      check.show(input, result);
      if (result.success) stage.say('✓ No stray keys and every value the right type', 'ok');
      else stage.say(`✗ ${plural(result.error.issues.length, 'issue')} found in one pass: ${result.error.issues.map((i) => i.code).join(' + ')}`, 'bad');
    },
    { editor: stage.root },
  );
  return stage.dispose;
};

export default mount;
