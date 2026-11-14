// VFX-JS example: TilePixelateEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TilePixelateEffect',
  summary:
    'A portrait rebuilt from square tiles. TilePixelateEffect colours each tile from its area (averageColor blends between the area and the source), colorTrim posterises, and gap leaves a space between tiles.',
  section: '@vfx-js/effects',
  tags: ['TilePixelateEffect', 'effect', 'size', 'gap', 'averageColor', 'colorTrim', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/tile-pixelate.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
