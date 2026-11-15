// penrose example: random(min, max)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'random(min, max)',
  summary:
    'Every circle gets `r : random(20, 65)`, a constant sampled uniformly from the range for the current variation. The optimizer can move the circles apart, but not resize them; the cards redraw the diagram under four variations, and the radii change each time.',
  section: 'Random Sampling',
  tags: ['random', 'Circle', 'variation', 'constant'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/random-sampling.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
