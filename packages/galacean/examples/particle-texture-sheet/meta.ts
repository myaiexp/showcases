// galacean example: Particle texture sheet animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle texture sheet animation",
  summary:
    "textureSheetAnimation over a 4 x 4 sheet of numbered cells drawn in code: frameOverTime runs the particle through all sixteen cells in its life. A slider sets cycleCount in the full view.",
  section: "Particle",
  tags: ['textureSheetAnimation', 'tiling', 'frameOverTime', 'cycleCount'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-animation-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
