// tanstack-charts example: A renderer adopts its prerendered shell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A renderer adopts its prerendered shell",
  summary:
    "A custom renderer's prerender returns a shell string that is inserted into the page before anything mounts. When mountChartRenderer then runs, the renderer's mount finds that element and keeps it instead of creating a new one. The readout compares the element's identity before and after, and the checkbox turns the shell off.",
  section: "SSR and Hydration",
  tags: ['ChartRenderer.prerender', 'mount', 'mountChartRenderer', 'adoption', 'createChartScene'],
  docs: ['repo/docs/guides/custom-marks-and-renderers.md', 'repo/docs/reference/rendering-and-export.md', 'repo/docs/guides/ssr-and-hydration.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
