// force-graph example: Interaction: enablePointerInteraction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: enablePointerInteraction',
  summary:
    'With enablePointerInteraction off the graph stops tracking the pointer: no hover ring, no tooltip, no clicks or node drags, and no per-frame hit test. The card switches it off and on while the fake pointer keeps moving.',
  section: 'Interaction',
  tags: ['enablePointerInteraction', 'onNodeHover', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
