// VFX-JS example: PixelSortEffect key, direction and angle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PixelSortEffect key, direction and angle',
  summary:
    'Pixel sorting on a landscape, with the knobs that change its look. key chooses what is ranked (luminance, a colour channel, hue or saturation), direction which end the bright pixels gather toward, and angle tilts the sort axis so the streaks run diagonally.',
  section: '@vfx-js/effects',
  tags: ['PixelSortEffect', 'key', 'direction', 'angle', 'hue', 'saturation', 'luminance'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/pixelsort.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
