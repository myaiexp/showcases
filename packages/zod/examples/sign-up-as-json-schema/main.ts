// Any Zod schema written out as the JSON Schema other tools read
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { schemaPair } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const SignUp = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  age: z.int().min(13).optional(),
  plan: z.enum(['free', 'pro']).default('free'),
});
const Pet = z.object({ name: z.string(), age: z.number() });
const Order = z.object({ sku: z.string(), qty: z.int().positive(), gift: z.boolean() });

const CASES = [
  {
    label: 'A sign-up',
    schema: SignUp,
    short: 'z.object({ username, email, age?, plan })',
    code: `z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  age: z.int().min(13).optional(),
  plan: z.enum(['free', 'pro']).default('free'),
})`,
  },
  { label: 'A pet', schema: Pet, short: 'z.object({ name: z.string(), age: z.number() })', code: 'z.object({\n  name: z.string(),\n  age: z.number(),\n})' },
  {
    label: 'An order',
    schema: Order,
    short: 'z.object({ sku, qty: z.int().positive(), gift })',
    code: 'z.object({\n  sku: z.string(),\n  qty: z.int().positive(),\n  gift: z.boolean(),\n})',
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a schema. Right: what z.toJSONSchema() writes, for form builders, API docs and AI tools.' });
  const { json, setCode } = schemaPair(stage, { code: '', short: '' });
  const at = stage.cycle(CASES, 3400, (c) => {
    setCode(c.code, c.short);
    json.set(z.toJSONSchema(c.schema));
    stage.say('The same rules as JSON text: types, lengths, which fields are required');
  });
  if (stage.bar) select(stage.bar, 'Schema', CASES.map((c, i) => [i, c.label] as const), at);
  return stage.dispose;
};

export default mount;
