// VFX-JS example: PixelSortEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PixelSortEffect',
  summary:
    'The bright parts of a flower bed streak like melted paint. PixelSortEffect sorts runs of pixels whose brightness lies inside range; sortRes is how finely the axis is divided and bypass skips the sort.',
  section: '@vfx-js/effects',
  tags: ['PixelSortEffect', 'effect', 'range', 'sortRes', 'bypass', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/pixelsort.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
