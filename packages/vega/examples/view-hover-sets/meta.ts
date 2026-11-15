// vega example: View: Hover Sets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Custom Hover Set Names',
  summary:
    'A grid of 32 cells whose encode sets are called "over" and "rest" instead of "hover" and "update", wired up by view.hover("over", "rest"): move the pointer across the grid and cells light up.',
  section: 'View API',
  tags: ['view.hover', 'encode.update', 'mark.rect'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
