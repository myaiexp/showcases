// cosmos-gl example: Drag events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag events',
  summary:
    'With enableDrag on, a point can be dragged and the layout reacts. onDragStart, onDrag and onDragEnd receive the d3 drag event for each stage of the drag, and the log shows where the pointer was.',
  section: 'Event callbacks',
  tags: ['enableDrag', 'onDragStart', 'onDrag', 'onDragEnd'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
