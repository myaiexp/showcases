// deck-gl example: an attribute filled by an update function and invalidated
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom attribute: update function and invalidate',
  summary:
    'A ScatterplotLayer subclass adds an instanceTint attribute with an update function that fills a Uint8ClampedArray for the rows it is asked to. updateState calls attributeManager.invalidate, either for every row or for a startRow/endRow range, and the readout counts the update calls.',
  section: 'Custom layers',
  tags: ['AttributeManager', 'invalidate', 'update function', 'Attribute', 'addInstanced', 'unorm8', 'inject'],
  docs: [
    'repo/docs/api-reference/core/attribute-manager.md',
    'repo/docs/api-reference/core/attribute.md',
    'repo/docs/developer-guide/custom-layers/attribute-management.md',
    'repo/docs/developer-guide/custom-layers/subclassed-layers.md',
    'repo/docs/developer-guide/custom-layers/layer-lifecycle.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
