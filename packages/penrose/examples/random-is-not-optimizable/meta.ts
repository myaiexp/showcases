// penrose example: Sampled values act as constants
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sampled values act as constants',
  summary:
    'Both tabs `encourage c.r == 50` and draw a dashed ring at radius 50. With `r = random(20, 80)` the encourage has no effect and each variation keeps its own radius; with `r = ?` the optimizer is free to move it, and every variation ends at the ring.',
  section: 'Random Sampling',
  tags: ['random', 'encourage', 'unknown', 'constant'],
  docs: ['repo/packages/docs-site/docs/ref/style/random-sampling.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
