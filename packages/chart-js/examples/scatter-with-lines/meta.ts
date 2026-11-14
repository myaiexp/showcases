// Chart.js example: Scatter points joined by lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scatter points joined by lines",
  summary:
    "A scatter chart hides its line by default. showLine: true joins the points in the order they are listed, which draws a path such as a delivery round.",
  section: 'Chart types',
  tags: ['showLine','tension','scatter'],
  docs: ['repo/docs/charts/scatter.md', 'repo/docs/charts/line.md', 'repo/docs/configuration/tooltip.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
