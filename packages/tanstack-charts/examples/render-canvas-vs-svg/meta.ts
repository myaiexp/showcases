// tanstack-charts example: One definition on SVG and on canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One definition on SVG and on canvas",
  summary:
    "The same definition is mounted twice, once with mountChart and once with mountCanvasChart, in two boxes side by side. A pretend pointer moves over both and each shows its own tooltip. The caption counts what each DOM holds: SVG elements on one side, canvas elements on the other.",
  section: "Rendering and Export",
  tags: ['mountChart', 'mountCanvasChart', 'renderer', 'tooltip'],
  docs: ['repo/docs/reference/rendering-and-export.md', 'repo/docs/reference/marks/dot-and-hexagon.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
