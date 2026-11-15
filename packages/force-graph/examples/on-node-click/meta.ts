// force-graph example: Interaction: onNodeClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: onNodeClick',
  summary:
    'onNodeClick gets the clicked node and the event. Here it calls centerAt and zoom with a duration, so the view glides in on the node; the card clicks a different node each round.',
  section: 'Interaction',
  tags: ['onNodeClick', 'centerAt', 'zoom', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
