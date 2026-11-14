// .omit(): the create form leaves out the fields only the server fills in
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { droppedPaths, objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Product = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number().positive(),
  createdAt: z.string(),
});
const NewProduct = Product.omit({ id: true, createdAt: true });

const SAMPLES = [
  { label: 'new product', value: { title: 'Sencha 100g', price: 7.5 } },
  { label: 'client sends an id', value: { id: 1, title: 'Sencha 100g', price: 7.5 } },
];

const VARIANTS: ObjectVariant[] = [
  { label: 'Product', code: 'Product = z.object({ id, title, price, createdAt })', schema: Product, say: (r) => (r.success ? '✓ A stored product' : '✗ The full product needs the server-made fields') },
  {
    label: 'Product.omit({ id, createdAt })',
    code: 'Product.omit({ id: true, createdAt: true })',
    schema: NewProduct,
    say: (r, input) => {
      const gone = r.success ? droppedPaths(input, r.data) : [];
      return r.success ? (gone.length ? `✓ Accepted, and the client's ${gone.join(', ')} was dropped` : '✓ Accepted: the client sent no server-made fields') : '✗ Not a valid new product';
    },
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Try sending an id with the new product." });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 0],
      [1, 0],
      [1, 1],
    ],
  });
  return stage.dispose;
};

export default mount;
