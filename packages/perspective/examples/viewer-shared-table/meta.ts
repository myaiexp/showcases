// Perspective example: one Table shared by two viewers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two viewers, one table',
  summary:
    'A grid and a bar chart load the same indexed Table. A timer calls table.update() with new quotes and both viewers follow; the table is deleted only after both viewers are.',
  section: 'Viewer',
  tags: ['load', 'shared table', 'update', 'index', 'delete'],
  docs: ['repo/docs/md/how_to/javascript/loading_data.md', 'repo/docs/md/how_to/javascript/deleting.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
