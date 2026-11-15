// penrose example: abs, min, max and average2 of two bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'abs, min, max and average2 of two bars',
  summary:
    'Two sampled bars, `a` and `b`, stand beside four derived bars: `max(a, b)`, `min(a, b)`, `average2(a, b)` and `abs(a - b)`, the gap between them. Each variation draws a new pair, so the derived bars rearrange.',
  section: 'Computation: Math',
  tags: ['abs', 'min', 'max', 'average2'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
