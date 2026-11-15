// override: a callback that edits each JSON Schema piece before it is returned
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { jsonTour } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const Note = z.object({ title: z.string(), body: z.string().max(200) });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The callback changes ctx.jsonSchema directly.' });
  jsonTour(
    stage,
    [
      { label: 'No override', call: 'z.toJSONSchema(Note)', make: () => z.toJSONSchema(Note), say: 'title has no length limit at all' },
      {
        label: 'Cap long text',
        call: 'z.toJSONSchema(Note, { override: capText })',
        make: () =>
          z.toJSONSchema(Note, {
            override: (ctx) => {
              if (ctx.jsonSchema.type === 'string' && ctx.jsonSchema.maxLength === undefined) ctx.jsonSchema.maxLength = 100;
            },
          }),
        say: 'Every string without a limit got maxLength 100; body kept its own 200',
        tone: 'ok',
      },
      {
        label: 'Stamp each object',
        call: 'z.toJSONSchema(Note, { override: stamp })',
        make: () =>
          z.toJSONSchema(Note, {
            override: (ctx) => {
              if (ctx.jsonSchema.type === 'object') ctx.jsonSchema['x-source'] = 'Note v1';
            },
          }),
        say: 'A custom keyword added to every object',
        tone: 'ok',
      },
    ],
    {
      code: `const Note = z.object({
  title: z.string(),
  body: z.string().max(200),
})

// runs for every piece of the schema
const capText = (ctx) => {
  if (ctx.jsonSchema.type === 'string' &&
      ctx.jsonSchema.maxLength === undefined)
    ctx.jsonSchema.maxLength = 100
}`,
      short: 'override: (ctx) => { ctx.jsonSchema.maxLength = 100 … }',
      menu: 'override',
    },
  );
  return stage.dispose;
};

export default mount;
