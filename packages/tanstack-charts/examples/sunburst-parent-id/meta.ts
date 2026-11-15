// tanstack-charts example: Sunburst from parent ids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst from parent ids",
  summary:
    "The same tree as rows with an id and a parent id. innerRadius is a function of the layout radius, so the hole in the middle keeps its proportion when the chart resizes.",
  section: "Sunburst Mark",
  tags: ['tooltip format', 'sunburst', 'nodeId', 'parentId', 'innerRadius', 'PolarLength'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/sunburst.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
