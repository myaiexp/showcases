// force-graph example: Interaction: onBackgroundClick and onBackgroundRightClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: onBackgroundClick and onBackgroundRightClick',
  summary:
    'onBackgroundClick fires for a click on empty space, here clearing the selected node, and onBackgroundRightClick for a right-click there, here fitting the view. Both receive the mouse event.',
  section: 'Interaction',
  tags: ['onBackgroundClick', 'onBackgroundRightClick', 'onNodeClick', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
