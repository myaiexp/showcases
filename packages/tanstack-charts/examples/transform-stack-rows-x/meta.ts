// tanstack-charts example: stackRowsX for horizontal stacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "stackRowsX for horizontal stacks",
  summary:
    "stackRowsX is the horizontal twin: rows get x1 and x2 endpoints along the value axis and keep the category on y. A rect over the rows draws a horizontal stack, and a checkbox reverses the stacking order.",
  section: "Data Transforms",
  tags: ["stackRowsX", "reverse", "rect"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
