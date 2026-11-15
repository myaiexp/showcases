// l7 example: Raster RGB countCut
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster RGB countCut',
  summary:
    'countCut [low, high] stretches each channel between two percentiles of its values (default [2, 98]). Tighter cuts raise the contrast; [0, 100] keeps the raw range.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'type: \'rgb\'', 'countCut', 'bands'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_rgb.en.md',
    'repo/site/docs/api/common/source/raster/raster_rgb.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
