// Pretext example: flow one article through several columns by passing the cursor on
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continue across columns',
  summary:
    "One article flows through three fixed-height columns. When a column is full the layout keeps the last line's end cursor and starts the next column there; the cursor is printed under each column.",
  section: 'Manual line layout',
  tags: ['layoutNextLineRange', 'LayoutCursor', 'columns', 'pagination'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
