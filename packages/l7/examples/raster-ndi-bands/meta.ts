// l7 example: Raster NDI band pair
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster NDI band pair',
  summary:
    'The ndi source\'s bands option names the two bands to normalise. Switch pairs and the same file gives a vegetation index, a water index or a rock index.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'type: \'ndi\'', 'bands'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_ndi.en.md',
    'repo/site/docs/api/common/source/raster/raster_ndi.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
