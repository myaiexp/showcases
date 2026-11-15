// tanstack-charts example: Relaxation iterations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Relaxation iterations",
  summary:
    "iterations sets how many relaxation passes the layout runs to move nodes closer to the nodes they connect to. At zero the nodes keep their first placement; a few passes already reduce link crossings.",
  section: "Sankey Diagram Mark",
  tags: ['sankeyDiagram', 'iterations'],
  docs: ['repo/docs/reference/marks/sankey.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
