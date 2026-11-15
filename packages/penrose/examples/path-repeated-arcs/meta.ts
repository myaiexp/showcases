// penrose example: repeatedArcs for equal-angle marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'repeatedArcs for equal-angle marks',
  summary:
    '`repeatedArcs` strokes several concentric arcs between two rays, starting from the inner arc and stepping outward by `spacing`. The tabs repeat the arc once, twice and three times, the usual way to tell equal angles apart in a diagram.',
  section: 'Computation: Paths & Curves',
  tags: ['repeatedArcs', 'ptOnLine', 'arcSweepFlag', 'Path'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
