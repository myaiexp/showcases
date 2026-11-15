// l7 example: Raster RGB band combination
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster RGB band combination',
  summary:
    'Source type \'rgb\' maps three bands of a multi-band grid to the red, green and blue channels. Pick a combination: bands count from zero, so [3, 2, 1] is bands 4, 3, 2 in the docs\' counting.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'type: \'rgb\'', 'bands', 'RGB composite'],
  docs: [
    'repo/site/docs/api/raster_layer/raster.en.md',
    'repo/site/docs/api/raster_layer/raster_rgb.en.md',
    'repo/site/docs/api/common/source/raster/raster_rgb.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
