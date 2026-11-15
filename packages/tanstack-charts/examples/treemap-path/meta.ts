// tanstack-charts example: Treemap from path rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap from path rows",
  summary:
    "Flat rows named app.core.scene and so on become a nested hierarchy through the path and delimiter options. Leaves are drawn with area proportional to size, colored by their top-level folder and labelled with their last path segment.",
  section: "Treemap Mark",
  tags: ['tooltip format', 'treemap', 'path', 'delimiter', 'color', 'label', 'inset'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/treemap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
