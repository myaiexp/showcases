// penrose example: selectColor: a checkerboard from the parity of a level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'selectColor: a checkerboard from the parity of a level',
  summary:
    '`selectColor(color1, color2, level)` returns the first colour when `level` is even and the second when it is odd. Feeding it `i + j` for each tile of a grid makes a checkerboard of two sampled colours.',
  section: 'Computation: Colors & Sampling',
  tags: ['selectColor', 'rgba'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
