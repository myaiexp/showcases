// 3d-force-graph example: Interaction: enablePointerInteraction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: enablePointerInteraction",
  summary:
    "enablePointerInteraction(false) stops the library from tracking the pointer: no hover, click, tooltip or node drag. Turning it off sends no hover-out, so the highlight is cleared by hand.",
  section: "Interaction",
  tags: ['enablePointerInteraction', 'onNodeHover', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
