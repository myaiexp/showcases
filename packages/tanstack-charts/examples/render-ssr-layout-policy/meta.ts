// tanstack-charts example: How the server picks an initial size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "How the server picks an initial size",
  summary:
    "A server cannot measure a container, so resolveChartAdapterLayout turns width, height, initialWidth and aspectRatio into a deterministic initial size: width wins over initialWidth, height wins over a ratio-derived height, and 640 by 320 is the fallback. The inputs set each option, and the SVG below is prerendered at the result.",
  section: "SSR and Hydration",
  tags: ['resolveChartAdapterLayout', 'ChartAdapterLayoutOptions', 'initialWidth', 'aspectRatio', 'prerender'],
  docs: [
    'repo/docs/reference/adapter-controller.md',
    'repo/docs/guides/ssr-and-hydration.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
