// Pretext example: read layoutWithLines() output as a table of lines and cursors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line cursors and hanging spaces',
  summary:
    "layoutWithLines() as a table: each line's text with visible spaces, its width, and its start and end cursors. Line width leaves out hanging spaces, a narrow width splits a long word mid-segment, and an empty text has no lines.",
  section: 'Manual line layout',
  tags: ['layoutWithLines', 'LayoutCursor', 'hanging spaces', 'pre-wrap'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
