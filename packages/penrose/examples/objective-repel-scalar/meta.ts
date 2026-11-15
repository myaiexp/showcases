// penrose example: repelScalar: two numbers pushed apart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "repelScalar: two numbers pushed apart",
  summary:
    'Both circles are pulled to x = 0 on their own rows. `repelScalar(c, d)` returns 1 / (c - d)^2 with no weight, so it is tiny for coordinates in pixels; dividing both by 10000 first makes the push strong enough to separate them in x.',
  section: "Objective Functions",
  tags: ['repelScalar', 'encourage', 'objective', 'equal'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
