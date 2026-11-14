// observable-plot example: Cell: Seattle temperature heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cell: Seattle temperature heatmap",
  summary: "Maximum temperature by day of month and month, 2012 to 2015: the group transform with a max reducer on fill feeds an ordinal cell mark.",
  section: 'Mark: Cell',
  tags: ['cell', 'group', 'fill', 'formatMonth', 'tickFormat'],
  docs: ['repo/docs/marks/cell.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
