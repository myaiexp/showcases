// Zod to JSON Schema and back: the rebuilt validator agrees with the original on samples
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaMatrix } from '../../shared/schema-matrix.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const SignUp = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  age: z.int().min(13).optional(),
  plan: z.enum(['free', 'pro']).default('free'),
});
// Only the JSON text travels: the rebuilt validator knows nothing about SignUp.
const Rebuilt = z.fromJSONSchema(z.toJSONSchema(SignUp, { io: 'input' }));

const ROWS = [
  { label: 'ada, ada@b.co', value: { username: 'ada', email: 'ada@b.co' } },
  { label: 'username "ad"', value: { username: 'ad', email: 'ada@b.co' } },
  { label: 'email "nope"', value: { username: 'ada', email: 'nope' } },
  { label: 'age 12', value: { username: 'ada', email: 'ada@b.co', age: 12 } },
  { label: 'age 20.5', value: { username: 'ada', email: 'ada@b.co', age: 20.5 } },
  { label: 'plan "gold"', value: { username: 'ada', email: 'ada@b.co', plan: 'gold' } },
  { label: 'no username', value: { email: 'ada@b.co' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Rebuilt = z.fromJSONSchema(z.toJSONSchema(SignUp, { io: "input" })).' });
  codeLine(stage.root, 'z.fromJSONSchema(z.toJSONSchema(SignUp, { io: "input" }))');
  schemaMatrix(
    stage.root,
    stage,
    [
      { head: 'Original SignUp', short: 'Original', schema: SignUp },
      { head: 'Rebuilt from JSON Schema', short: 'Rebuilt', schema: Rebuilt },
    ],
    stage.preview ? ROWS.slice(0, 6) : ROWS,
  );
  const same = ROWS.every((r) => SignUp.safeParse(r.value).success === Rebuilt.safeParse(r.value).success);
  stage.say(same ? '✓ Same verdict on every sample: the JSON Schema kept the rules' : '✗ The two disagree on a sample', same ? 'ok' : 'bad');
  return stage.dispose;
};

export default mount;
