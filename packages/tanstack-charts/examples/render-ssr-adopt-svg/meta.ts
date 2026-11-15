// tanstack-charts example: Server SVG, then mountChart takes over
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Server SVG, then mountChart takes over",
  summary:
    "A runtime compiles the chart at an explicit size and renderChartSvg returns markup, which is inserted into the container as if it came from a server. mountChart is then called on that container. The readout says whether the browser kept the same svg element, and the checkbox hands the prerender runtime to mountChart as its third argument.",
  section: "SSR and Hydration",
  tags: ['createChartRuntime', 'renderChartSvg', 'mountChart', 'runtime handoff', 'idPrefix'],
  docs: ['repo/docs/guides/ssr-and-hydration.md', 'repo/docs/reference/adapter-controller.md', 'repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
