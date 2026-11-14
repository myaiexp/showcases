// observable-plot example: Rect: county bounding boxes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: county bounding boxes',
  summary:
    'Every US county as a rectangle from its geographic bounds, with x1, y1, x2 and y2 read from [x1, y1, x2, y2] tuples and drawn in the albers-usa projection.',
  section: 'Mark: Rect',
  tags: ['rect', 'x1', 'y1', 'x2', 'y2', 'projection'],
  docs: ['repo/docs/marks/rect.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
