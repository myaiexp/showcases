// tanstack-charts example: SVG accessibility and class options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG accessibility and class options",
  summary:
    "renderChartSvg takes an accessible name, an optional description, a class, a tab index and an id prefix. The inputs edit each option and the readout shows what lands on the root svg element: its role, aria attributes, class, tabindex, viewBox and desc text, and the prefixed gradient id.",
  section: "Rendering and Export",
  tags: ['renderChartSvg', 'ariaLabel', 'ariaDescription', 'className', 'tabIndex', 'idPrefix'],
  docs: [
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/reference/runtime-and-scene.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
