// io: what goes in (input) or what comes out (output), for defaults, transforms and strictness
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { jsonTour } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const Item = z.object({
  plan: z.enum(['free', 'pro']).default('free'),
  age: z.string().transform(Number).pipe(z.int()),
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zod reads the schema from the outside (what arrives) or the inside (what you get).' });
  jsonTour(
    stage,
    [
      { label: 'Output (default)', call: 'z.toJSONSchema(Item)', make: () => z.toJSONSchema(Item), say: 'What parse() hands back: plan is always there, age is a whole number' },
      { label: 'Input', call: "z.toJSONSchema(Item, { io: 'input' })", make: () => z.toJSONSchema(Item, { io: 'input' }), say: 'What arrives: plan may be left out, age is still text', tone: 'warn' },
    ],
    {
      code: `const Item = z.object({
  plan: z.enum(['free', 'pro']).default('free'),
  age: z.string().transform(Number).pipe(z.int()),
})`,
      short: 'z.object({ plan: …default("free"), age: text → int })',
      menu: 'io',
      ms: 4200,
    },
  );
  return stage.dispose;
};

export default mount;
