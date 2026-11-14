// deck-gl example: custom attributes with accessors and transitions on a from-scratch layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom attributes with transitions',
  summary:
    "A from-scratch BarLayer registers instanceHeights and instanceColors with AttributeManager.addInstanced (accessor names, transition: true). Changing the accessors' updateTriggers recomputes the attributes, and the transitions prop interpolates the GPU buffers over the chosen duration.",
  section: 'Custom layers',
  tags: ['AttributeManager', 'addInstanced', 'accessor', 'transitions', 'updateTriggers', 'Model', 'attribute'],
  docs: [
    'repo/docs/developer-guide/custom-layers/attribute-management.md',
    'repo/docs/developer-guide/custom-layers/layer-attributes.md',
    'repo/docs/api-reference/core/attribute-manager.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
