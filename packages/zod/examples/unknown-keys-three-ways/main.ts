// Unknown keys: z.object strips them, z.strictObject rejects them, z.looseObject keeps them
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { droppedPaths, objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const shape = { name: z.string(), email: z.email() };
const Strip = z.object(shape);
const Strict = z.strictObject(shape);
const Loose = z.looseObject(shape);

const SAMPLES = [
  { label: 'clean sign-up', value: { name: 'Ada', email: 'ada@example.com' } },
  { label: 'sneaky isAdmin', value: { name: 'Ada', email: 'ada@example.com', isAdmin: true } },
  { label: 'two extras', value: { name: 'Ada', email: 'ada@example.com', isAdmin: true, referrer: 'ad-42' } },
];

const extras = (input: unknown): string[] => Object.keys(input as object).filter((k) => !(k in shape));

const VARIANTS: ObjectVariant[] = [
  {
    label: 'z.object (strips)',
    code: 'z.object({ name, email })',
    schema: Strip,
    say: (r, input) => {
      const gone = r.success ? droppedPaths(input, r.data) : [];
      return gone.length ? `✓ Passed, but ${gone.join(' and ')} silently vanished from the result` : '✓ Passed: there was nothing to drop';
    },
  },
  {
    label: 'z.strictObject (rejects)',
    code: 'z.strictObject({ name, email })',
    schema: Strict,
    say: (r) => (r.success ? '✓ Passed: no unknown keys to object to' : `✗ Rejected: ${r.error.issues[0]?.message}`),
  },
  {
    label: 'z.looseObject (keeps)',
    code: 'z.looseObject({ name, email })',
    schema: Loose,
    say: (r, input) => (extras(input).length ? `✓ Passed, and ${extras(input).join(' and ')} came along in the result` : '✓ Passed: no extra keys to keep'),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a schema and a payload: the same extra key lands three different ways.' });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
  });
  return stage.dispose;
};

export default mount;
