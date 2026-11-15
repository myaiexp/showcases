// postprocessing example: GridEffect overlay with scale and lineWidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grid: scale and line width',
  summary:
    'GridEffect overlays a grid on the picture (its blend function defaults to OVERLAY). scale sets the cell density relative to the screen height and lineWidth adds to the line thickness.',
  section: 'Pattern',
  tags: ['GridEffect', 'scale', 'lineWidth', 'BlendFunction'],
  docs: ['repo/README.md', 'repo/src/effects/GridEffect.js', 'repo/src/effects/glsl/grid.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
