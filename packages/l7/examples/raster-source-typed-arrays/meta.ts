// l7 example: Raster source typed arrays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster source typed arrays',
  summary:
    'The raster source takes any typed array: Uint8, Int16, Uint16, Float32, Float64 and the rest. The same elevation field is cast to each and drawn with one domain.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'source', 'RasterDataType', 'Uint8Array', 'Int16Array', 'Float32Array', 'Float64Array'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
