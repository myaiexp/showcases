// Catchall: keys the shape does not name must still hold numbers
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { droppedPaths, objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Plain = z.object({ sku: z.string() });
const Stock = z.object({ sku: z.string() }).catchall(z.number());

const SAMPLES = [
  { label: 'stock counts', value: { sku: 'TEA-1', helsinki: 12, tampere: 4 } },
  { label: 'a text count', value: { sku: 'TEA-1', helsinki: '12', tampere: 4 } },
  { label: 'a null count', value: { sku: 'TEA-1', helsinki: 12, oulu: null } },
];

const VARIANTS: ObjectVariant[] = [
  {
    label: 'plain z.object',
    code: 'z.object({ sku: z.string() })',
    schema: Plain,
    say: (r, input) => {
      const gone = r.success ? droppedPaths(input, r.data) : [];
      return gone.length ? `✓ Passed, and ${gone.join(', ')} vanished: unknown keys are not checked, just dropped` : '✓ Passed';
    },
  },
  {
    label: '.catchall(z.number())',
    code: 'z.object({ sku: z.string() }).catchall(z.number())',
    schema: Stock,
    say: (r) => (r.success ? '✓ Every extra key holds a number, so they all stay' : `✗ The extra key "${r.error.issues[0]?.path.join('.')}" failed the catchall: ${r.error.issues[0]?.message}`),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the JSON: add a warehouse, or break a count.' });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  });
  return stage.dispose;
};

export default mount;
