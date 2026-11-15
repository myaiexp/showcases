// z.treeifyError turns a flat issue list into a tree shaped like the data that was checked
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { treeView } from '../../shared/error-format-view.ts';
import { columns } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { valueView } from '../../shared/value-view.ts';
import { codeLine, plural } from '../../shared/widgets.ts';

const Order = z.object({
  customer: z.object({ name: z.string().min(2), email: z.email() }),
  items: z.array(z.object({ sku: z.string(), qty: z.number().int().positive() })).min(1),
});

const SAMPLES = [
  { label: 'Bad customer', value: { customer: { name: 'A', email: 'ada@' }, items: [{ sku: 'tea', qty: 1 }] } },
  { label: 'Bad items', value: { customer: { name: 'Ada', email: 'ada@example.com' }, items: [{ sku: 'tea', qty: 0 }, { sku: 7, qty: 2 }] } },
  { label: 'No items', value: { customer: { name: 'Ada', email: 'ada@example.com' }, items: [] } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an order: the tree on the right has the same nesting as the data on the left.' });
  codeLine(stage.root, 'z.treeifyError(result.error)');
  const cols = columns(stage.root, stage.preview ? [''] : ['The order, issues marked', 'The tree']);
  const data = stage.preview ? null : cols[0]!;
  const tree = cols[stage.preview ? 0 : 1]!;
  // A card has room for the short trees only.
  drive(stage, stage.preview ? [SAMPLES[0]!, SAMPLES[2]!] : SAMPLES, (value) => {
    const result = Order.safeParse(value);
    if (result.success) return;
    data?.body.replaceChildren(valueView(value, { issues: result.error.issues }));
    // errors sit at each node; properties hold the object's fields, items the array's elements.
    tree.body.replaceChildren(treeView(z.treeifyError(result.error)));
    stage.say(`✗ ${plural(result.error.issues.length, 'issue')}, each filed under the field or item it belongs to`, 'bad');
  });
  return stage.dispose;
};

export default mount;
