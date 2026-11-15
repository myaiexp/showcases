// .shape: each field's own schema, used on its own for single values
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { schemaTour, type Variant } from '../../shared/schema-tour.ts';

const Signup = z.object({
  email: z.email(),
  age: z.number().int().min(13),
  plan: z.enum(['free', 'pro']),
});

// Signup.shape.email is the very schema Signup applies to its email key.
const VARIANTS: Variant[] = [
  { label: 'Signup.shape.email', code: 'Signup.shape.email.safeParse(value)', schema: Signup.shape.email, say: 'The email field alone: only the real address passes' },
  { label: 'Signup.shape.age', code: 'Signup.shape.age.safeParse(value)', schema: Signup.shape.age, say: 'The age field alone: a whole number, 13 or more' },
  { label: 'Signup.shape.plan', code: 'Signup.shape.plan.safeParse(value)', schema: Signup.shape.plan, say: 'The plan field alone: only "free" or "pro"' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a field: the same five values meet a different schema pulled from one object.' });
  schemaTour(stage, VARIANTS, {
    inputs: ['ada@example.com', 'ada@', 'pro', 29, 12],
    inTitle: 'Loose value',
    noun: 'values',
  });
  return stage.dispose;
};

export default mount;
