// .extend() with a key the schema already has: the new rule replaces the old one
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const OldOrder = z.object({ id: z.number(), item: z.string() });
const NewOrder = OldOrder.extend({ id: z.string().startsWith('ord_') });

const SAMPLES = [
  { label: 'old numeric id', value: { id: 1001, item: 'tea' } },
  { label: 'new text id', value: { id: 'ord_1001', item: 'tea' } },
];

const VARIANTS: ObjectVariant[] = [
  { label: 'OldOrder', code: 'OldOrder = z.object({ id: z.number(), item })', schema: OldOrder, say: (r) => (r.success ? '✓ A numeric id suits the old schema' : '✗ The old schema wants a number') },
  {
    label: 'OldOrder.extend({ id })',
    code: "OldOrder.extend({ id: z.string().startsWith('ord_') })",
    schema: NewOrder,
    say: (r) => (r.success ? '✓ The new id rule replaced the old one' : '✗ The old number rule is gone: id must now be text starting ord_'),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same key in .extend() wins over the original.' });
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
