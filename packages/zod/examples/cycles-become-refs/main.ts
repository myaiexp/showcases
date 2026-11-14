// A schema that contains itself: written as a $ref back to the top, or refused
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { jsonTour } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const Category = z.object({
  name: z.string(),
  get children() {
    return z.array(Category);
  },
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A category holds categories, which hold categories…' });
  jsonTour(
    stage,
    [
      { label: 'ref (default)', call: 'z.toJSONSchema(Category)', make: () => z.toJSONSchema(Category), say: '"$ref": "#" means "a whole Category again, from the top"', tone: 'ok' },
      { label: 'throw', call: "z.toJSONSchema(Category, { cycles: 'throw' })", make: () => z.toJSONSchema(Category, { cycles: 'throw' }), say: 'With cycles: "throw" a loop is an error', tone: 'bad' },
    ],
    {
      code: `const Category = z.object({
  name: z.string(),
  get children() {
    return z.array(Category);
  },
})`,
      short: 'Category = z.object({ name, get children() → z.array(Category) })',
      menu: 'cycles',
      marks: false,
    },
  );
  return stage.dispose;
};

export default mount;
