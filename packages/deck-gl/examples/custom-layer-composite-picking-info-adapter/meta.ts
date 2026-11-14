// deck-gl example: a composite layer rewrites picking info with getPickingInfo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Composite layer: getPickingInfo adapter',
  summary:
    "An adapter composite layer groups cities by country and draws one bubble per group. Its getPickingInfo turns the sublayer's group into the list of original rows and adds a field, so onHover receives what the app's data looks like instead of the layer's internals.",
  section: 'Custom layers',
  tags: ['CompositeLayer', 'getPickingInfo', 'sourceLayer', 'adapter layer', 'updateState'],
  docs: [
    'repo/docs/developer-guide/custom-layers/composite-layers.md',
    'repo/docs/developer-guide/custom-layers/picking.md',
    'repo/docs/api-reference/core/composite-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
