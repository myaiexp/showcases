// deck-gl example: CompositeLayer.filterSubLayer switches sublayers on zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Composite layer: filterSubLayer by zoom',
  summary:
    'A composite layer renders an overview sublayer and a detail sublayer once, and filterSubLayer decides before every redraw which one is drawn from the current viewport zoom. The readout counts renderLayers calls to show that zooming does not re-run it.',
  section: 'Custom layers',
  tags: ['CompositeLayer', 'filterSubLayer', 'viewport', 'sublayers', 'level of detail'],
  docs: [
    'repo/docs/api-reference/core/composite-layer.md',
    'repo/docs/developer-guide/custom-layers/composite-layers.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
