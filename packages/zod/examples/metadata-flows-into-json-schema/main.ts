// Titles, descriptions, examples and your own fields travel from .meta() into JSON Schema
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { jsonTour } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const Product = z.object({
  name: z.string().meta({ title: 'Name', description: 'Shown on the shelf', examples: ['Sencha'] }),
  price: z.number().positive().meta({ description: 'In euros', 'x-currency': 'EUR' }),
  sku: z.string().meta({ deprecated: true }),
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Highlighted lines came from metadata.' });
  jsonTour(
    stage,
    [
      { label: 'Metadata dropped', call: 'z.toJSONSchema(Product, { metadata: z.registry() })', make: () => z.toJSONSchema(Product, { metadata: z.registry() }), say: 'An empty registry: only the rules are written' },
      { label: 'Global registry (default)', call: 'z.toJSONSchema(Product)', make: () => z.toJSONSchema(Product), say: 'Every field you stored with .meta() is copied across, even x-currency', tone: 'ok' },
    ],
    {
      code: `const Product = z.object({
  name: z.string().meta({
    title: 'Name', description: 'Shown on the shelf',
    examples: ['Sencha'],
  }),
  price: z.number().positive()
    .meta({ description: 'In euros', 'x-currency': 'EUR' }),
  sku: z.string().meta({ deprecated: true }),
})`,
      short: 'z.object({ name: …meta({ title, description, examples }), … })',
      menu: 'metadata',
      ms: 3600,
    },
  );
  return stage.dispose;
};

export default mount;
