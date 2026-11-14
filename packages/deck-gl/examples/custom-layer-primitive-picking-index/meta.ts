// deck-gl example: custom picking with a rowIndexes attribute and getPickingInfo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Primitive layer: custom picking index',
  summary:
    "A from-scratch layer whose instances are stars but whose picking ids are constellations: a rowIndexes attribute feeds picking_getPickingColorFromIndex in the vertex shader, and getPickingInfo looks info.object up in a groups prop. Hovering one star highlights the whole constellation.",
  section: 'Custom layers',
  tags: ['Layer', 'picking', 'rowIndexes', 'getPickingInfo', 'decodePickingColor', 'autoHighlight', 'Model'],
  docs: [
    'repo/docs/developer-guide/custom-layers/picking.md',
    'repo/docs/developer-guide/custom-layers/primitive-layers.md',
    'repo/docs/api-reference/core/layer.md',
    'repo/docs/api-reference/core/attribute-manager.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
