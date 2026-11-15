// penrose example: Sine, cosine and tangent on a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sine, cosine and tangent on a circle',
  summary:
    'A point sits on a circle at a sampled angle given in degrees and converted with `toRadians`. `cos` gives the horizontal leg, `sin` the vertical leg and `tan` the length of the tangent line at the right edge, each drawn as a coloured segment.',
  section: 'Computation: Math',
  tags: ['sin', 'cos', 'tan', 'toRadians'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
