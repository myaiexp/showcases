// penrose example: diffusionProcess: a random walk with drift
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'diffusionProcess: a random walk with drift',
  summary:
    '`diffusionProcess(40, start, A, omega)` returns forty points of a random walk. The covariance matrix `A` sets how jittery each step is and the sampled drift `omega` pushes the walk along, so every variation drifts off in a new direction with new noise.',
  section: 'Computation: Paths & Curves',
  tags: ['diffusionProcess', 'Polyline'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
