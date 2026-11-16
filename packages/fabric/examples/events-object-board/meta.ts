// fabric example: Events: every object event on a board
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: every object event on a board',
  summary:
    'One rectangle listens to mouseover, mouseout, mousemove, mousedown, mouseup, mousedblclick, mousewheel, selected, deselected, moving, scaling, rotating, skewing, modified, added and removed. Each chip lights up when its event fires.',
  section: 'Events',
  tags: ['on', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'mousedblclick', 'mousewheel', 'selected', 'deselected', 'moving', 'scaling', 'rotating', 'skewing', 'modified', 'added', 'removed'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md',
    'repo/src/content/docs/api/interfaces/ObjectEvents.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
