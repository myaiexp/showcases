// deck-gl example: a composite layer built from a ScatterplotLayer and a TextLayer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Composite layer: dots with labels',
  summary:
    'A CompositeLayer subclass, LabeledDotLayer, with its own defaultProps and prop types. renderLayers returns a ScatterplotLayer and a TextLayer, built with getSubLayerProps so their ids, opacity and coordinate system follow the parent, and their update triggers are remapped from the parent prop names.',
  section: 'Custom layers',
  tags: ['CompositeLayer', 'renderLayers', 'getSubLayerProps', 'defaultProps', 'updateTriggers'],
  docs: [
    'repo/docs/developer-guide/custom-layers/README.md',
    'repo/docs/developer-guide/custom-layers/composite-layers.md',
    'repo/docs/developer-guide/custom-layers/prop-types.md',
    'repo/docs/api-reference/core/composite-layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
