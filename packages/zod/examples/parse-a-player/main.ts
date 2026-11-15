// A Player schema checks sample data: ✓ with a clean copy, or ✗ with each wrong field
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, plural } from '../../shared/widgets.ts';

// The schema: a player has a username that is text and an xp that is a number.
const Player = z.object({
  username: z.string(),
  xp: z.number(),
});

const SAMPLES = [
  { label: 'billie, 100 xp', value: { username: 'billie', xp: 100 } },
  { label: 'swapped types', value: { username: 42, xp: '100' } },
  { label: 'xp left out', value: { username: 'billie' } },
  { label: 'not an object', value: 'billie' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a sample or edit the JSON below.' });
  codeLine(stage.root, 'z.object({ username: z.string(), xp: z.number() })');
  const check = checkpoint(stage.root, stage, { label: 'Player.safeParse', types: true });

  drive(
    stage,
    SAMPLES,
    (input) => {
      // safeParse never throws: it returns { success, data } or { success, error }.
      const result = Player.safeParse(input);
      check.show(input, result);
      if (result.success) stage.say('✓ Valid: data is a clean copy of the input', 'ok');
      else stage.say(`✗ ${plural(result.error.issues.length, 'issue')}, each naming its field`, 'bad');
    },
    { editor: stage.root },
  );
  return stage.dispose;
};

export default mount;
