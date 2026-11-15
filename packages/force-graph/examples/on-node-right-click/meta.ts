// force-graph example: Interaction: onNodeRightClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: onNodeRightClick',
  summary:
    'A right-click on a node pins it by copying x and y into fx and fy, and a second one releases it; pinned nodes carry a ring drawn with nodeCanvasObject. The card right-clicks through a few nodes.',
  section: 'Interaction',
  tags: ['onNodeRightClick', 'fx', 'fy', 'nodeCanvasObject', 'nodeCanvasObjectMode'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
