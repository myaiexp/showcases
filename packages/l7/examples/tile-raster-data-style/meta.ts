// l7 example: Data raster tiles: domain and ramp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data raster tiles: domain and ramp',
  summary:
    'Data raster tiles are coloured at draw time: style({ domain, clampLow, clampHigh, rampColors }) re-maps the same elevation tiles without fetching them again.',
  section: 'Tile Layer',
  tags: ['RasterLayer', 'dataType: \'arraybuffer\'', 'domain', 'clampLow', 'clampHigh', 'rampColors'],
  docs: [
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/tile/common/style.en.md',
    'repo/site/docs/api/common/layer/raster/style_single.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
