// zephyr3d example: Blending clips by weight: idle, walk and run together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blending clips by weight: idle, walk and run together',
  summary:
    'Three clips play at once, each with its own weight, and the engine takes the weighted average of the poses (S = sum(S_i w_i) / sum(w_i)). Sliders change each playback\'s weight live.',
  section: 'Animation',
  tags: ['weight', 'playAnimation', 'playback.weight', 'weighted average'],
  docs: ['repo/apps/doc/web/en/animation-blending.md', 'repo/apps/doc/web/en/animation-intro.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
