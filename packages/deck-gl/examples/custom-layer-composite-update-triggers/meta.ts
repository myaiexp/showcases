// deck-gl example: a composite layer remaps updateTriggers to its sublayer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Composite layer: forwarding updateTriggers',
  summary:
    "A composite layer renames accessors (getDotColor becomes the sublayer's getFillColor), so the user's updateTriggers must be renamed too. A checkbox turns the remapping off to show colours that never recompute.",
  section: 'Custom layers',
  tags: ['CompositeLayer', 'updateTriggers', 'getSubLayerProps', 'accessor'],
  docs: [
    'repo/docs/developer-guide/custom-layers/composite-layers.md',
    'repo/docs/api-reference/core/composite-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
