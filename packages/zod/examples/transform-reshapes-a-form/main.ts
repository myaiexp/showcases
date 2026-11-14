// An object schema with a transform: validated fields in, a different shape out
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const SignUp = z
  .object({
    first: z.string().min(1),
    last: z.string().min(1),
    email: z.email(),
  })
  .transform((form) => ({
    fullName: `${form.first} ${form.last}`,
    email: form.email.toLowerCase(),
  }));

const SAMPLES = [
  { label: 'good form', value: { first: 'Ada', last: 'Lovelace', email: 'Ada@Example.com' } },
  { label: 'bad email', value: { first: 'Ada', last: 'Lovelace', email: 'ada@' } },
  { label: 'missing last name', value: { first: 'Grace', last: '', email: 'grace@example.com' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the JSON: the transform only runs once every field is valid.' });
  objectLab(
    stage,
    [
      {
        label: 'SignUp',
        code: 'z.object({ first, last, email }).transform(f => ({ fullName, email }))',
        schema: SignUp,
        say: (r) => (r.success ? '✓ Valid, then reshaped: first + last became fullName' : '✗ A field failed, so the transform never ran'),
      },
    ],
    SAMPLES,
    { plan: [[0, 0], [0, 1], [0, 2]], ms: 3200 },
  );
  return stage.dispose;
};

export default mount;
