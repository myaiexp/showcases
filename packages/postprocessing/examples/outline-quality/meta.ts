// postprocessing example: OutlineEffect multisampling and resolutionScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outline: multisampling and resolution',
  summary:
    'The outline is computed in its own buffers. resolutionScale (default 0.5) sets their size relative to the canvas, so a low value draws blocky, thick lines; multisampling turns on MSAA for the mask buffer and smooths the stair-steps. Cards step through four combinations.',
  section: 'Outline',
  tags: ['OutlineEffect', 'multisampling', 'resolutionScale', 'resolution', 'Resolution'],
  docs: ['repo/README.md', 'repo/src/effects/OutlineEffect.js', 'repo/src/core/Resolution.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
