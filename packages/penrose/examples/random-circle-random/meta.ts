// penrose example: circleRandom() on a ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'circleRandom() on a ring',
  summary:
    '`circleRandom()` samples the unit circle itself rather than its inside. Scaled by 110, twenty of them give dots on a ring, and a Line from the centre to each makes a burst of random spokes.',
  section: 'Random Sampling',
  tags: ['circleRandom', 'Line', 'Circle', 'vector'],
  docs: ['repo/packages/docs-site/docs/ref/style/random-sampling.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
