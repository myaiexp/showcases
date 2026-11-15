// penrose example: acos and atan on the unit circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'acos and atan on the unit circle',
  summary:
    'A sampled ratio between -0.9 and 0.9 goes into `acos` and `atan`. Each returned angle (in radians) sets the direction of a radius, so the two coloured spokes show which angle has that cosine or that tangent. (`asin` is left out: it crashes the optimizer on 3.3.1.)',
  section: 'Computation: Math',
  tags: ['acos', 'atan'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
