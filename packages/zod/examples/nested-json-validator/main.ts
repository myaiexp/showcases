// A nested order schema: deep issue paths, and a refine that checks the total
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { plural } from '../../shared/widgets.ts';

const Item = z.object({
  sku: z.string().min(1),
  qty: z.number().int().positive(),
  price: z.number().positive(),
});

const Order = z
  .object({
    customer: z.object({ name: z.string(), email: z.email() }),
    items: z.array(Item).min(1),
    total: z.number(),
  })
  // A rule across fields: the total must equal the sum of the items. `path` puts the
  // issue on `total` instead of on the order as a whole.
  .refine((o) => Math.abs(o.total - o.items.reduce((s, i) => s + i.qty * i.price, 0)) < 0.005, {
    error: 'Total does not match the items',
    path: ['total'],
  });

const good = {
  customer: { name: 'Ada', email: 'ada@example.com' },
  items: [
    { sku: 'TEA', qty: 2, price: 4.5 },
    { sku: 'MUG', qty: 1, price: 12 },
  ],
  total: 21,
};

const SAMPLES = [
  { label: 'valid order', value: good },
  { label: 'bad quantity', value: { ...good, items: [good.items[0], { sku: 'MUG', qty: 1.5, price: 12 }] } },
  { label: 'wrong total', value: { ...good, total: 25 } },
  { label: 'bad email, empty sku', value: { ...good, customer: { name: 'Ada', email: 'ada@' }, items: [{ sku: '', qty: 2, price: 4.5 }], total: 9 } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Break any field in the JSON: the issue names its exact path.' });
  const check = checkpoint(stage.root, stage, { label: 'Order.safeParse', messages: !stage.preview });
  drive(
    stage,
    SAMPLES,
    (input) => {
      const result = Order.safeParse(input);
      check.show(input, result);
      if (result.success) stage.say('✓ Valid order', 'ok');
      else stage.say(`✗ ${plural(result.error.issues.length, 'issue')} at ${result.error.issues.map((i) => i.path.join('.')).join(', ')}`, 'bad');
    },
    { editor: stage.root, ms: 3000 },
  );
  return stage.dispose;
};

export default mount;
