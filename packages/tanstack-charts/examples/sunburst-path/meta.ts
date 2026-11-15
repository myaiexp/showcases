// tanstack-charts example: Sunburst from path rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst from path rows",
  summary:
    "A flat list of dotted names becomes concentric rings inside a polar container: the first ring is the top-level folders and the next ring their files. Angles are proportional to the summed size, and color follows the folder.",
  section: "Sunburst Mark",
  tags: ['tooltip format', 'sunburst', 'polar', 'path', 'delimiter', 'color', 'branchId'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/sunburst.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
