// force-graph example: Interaction: enableNodeDrag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: enableNodeDrag',
  summary:
    'enableNodeDrag(false) turns node dragging off. The card drags a node with it on (the node follows) and off (the same gesture grabs the background and pans the view instead).',
  section: 'Interaction',
  tags: ['enableNodeDrag', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
