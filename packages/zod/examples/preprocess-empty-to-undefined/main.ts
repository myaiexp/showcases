// A profile form with two optional fields, with and without turning empty text into undefined
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const plain = z.object({
  nickname: z.string().min(3).optional(),
  age: z.coerce.number().int().optional(),
});

// Empty text becomes undefined first, so .optional() sees "not given".
const blankIsMissing = <T extends z.ZodType>(schema: T) => z.preprocess((val) => (val === '' ? undefined : val), schema);
const tidy = z.object({
  nickname: blankIsMissing(z.string().min(3).optional()),
  age: blankIsMissing(z.coerce.number().int().optional()),
});

const SAMPLES = [
  { label: 'blank form', value: { nickname: '', age: '' } },
  { label: 'filled in', value: { nickname: 'ada_l', age: '36' } },
  { label: 'bad values', value: { nickname: 'ab', age: 'old' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a form and a schema: watch what happens to the empty fields.' });
  objectLab(
    stage,
    [
      { label: 'optional only', code: 'z.string().min(3).optional()  and  z.coerce.number().int().optional()', schema: plain, say: (r) => (r.success ? '✓ Passed: but an empty age became 0, a real number nobody typed' : `✗ ${r.error.issues.length} issue(s): empty text is not "missing"`) },
      { label: 'with preprocess', code: 'z.preprocess(v => v === "" ? undefined : v, …optional())', schema: tidy, say: (r) => (r.success ? '✓ Blank fields were treated as not given and dropped from the output' : `✗ ${r.error.issues.length} issue(s): only filled-in fields are checked`) },
    ],
    SAMPLES,
    { plan: [[0, 0], [1, 0], [1, 2]] },
  );
  return stage.dispose;
};

export default mount;
