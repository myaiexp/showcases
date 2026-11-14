// VFX-JS example: TilePixelateEffect shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TilePixelateEffect shapes',
  summary:
    'The tile mosaic with other tile shapes: rectangle, ellipse, hexagon and triangle. stretch widens the tiles, dissolve drops a share of them at random (falloff biases where), and knockout decides whether the gaps are transparent or show the source.',
  section: '@vfx-js/effects',
  tags: ['TilePixelateEffect', 'shape', 'hexagon', 'triangle', 'stretch', 'dissolve', 'falloff', 'knockout'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/tile-pixelate.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
