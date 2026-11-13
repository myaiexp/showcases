// Sigma.js example: GPU-computed ForceAtlas2 layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ForceAtlas2 on the GPU',
  summary:
    'ForceAtlas2GPULayout lays out a community graph live inside sigma\'s WebGL context, from a random scatter. Start, stop and re-scatter it; stopping writes the positions back to graphology.',
  section: 'Technical guides',
  tags: ['layout', 'forceatlas2', 'webgl2', 'start/stop'],
  docs: ['repo/packages/layout-fa2-gpu/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
