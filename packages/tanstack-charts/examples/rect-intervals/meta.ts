// tanstack-charts example: Gantt rows with rect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gantt rows with rect',
  summary:
    'rect draws one independent x and y interval per row. Here x1 and x2 are start and end days of tasks, y is a lane on a band scale, and z colours by status. Equal y endpoints span the lane\'s full band.',
  section: 'Bar and Rect Marks',
  tags: ['rect', 'x1', 'x2', 'y', 'z', 'inset', 'radius'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
