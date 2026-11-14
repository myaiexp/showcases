// deck-gl example: a custom LayerExtension that filters by colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layer extension: colour key filter',
  summary:
    'A LayerExtension subclass appends a uniform-block module and a fs:DECKGL_FILTER_COLOR hook through getShaders, sets the uniform from updateState, and passes its props to the sublayers of a GeoJsonLayer with getSubLayerProps, so polygons, lines and points are all filtered by one class.',
  section: 'Custom layers',
  tags: ['LayerExtension', 'getShaders', 'updateState', 'getSubLayerProps', 'GeoJsonLayer', 'inject'],
  docs: [
    'repo/docs/developer-guide/custom-layers/layer-extensions.md',
    'repo/docs/developer-guide/custom-layers/writing-shaders.md',
    'repo/docs/api-reference/core/composite-layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
