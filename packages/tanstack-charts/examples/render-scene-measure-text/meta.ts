// tanstack-charts example: Text measurers change the compiled margins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text measurers change the compiled margins",
  summary:
    "The third argument of createChartScene carries layout options. Passing a measureText function changes how wide tick labels are believed to be, so the automatic left margin and plot width differ between a narrow, a wide and the default measurer. The three scenes are compiled without any DOM measurement and shown side by side.",
  section: "Runtime and Scene",
  tags: ['createChartScene', 'ChartLayoutOptions', 'measureText', 'ChartTextMeasurer', 'margin'],
  docs: ['repo/docs/reference/runtime-and-scene.md', 'repo/docs/guides/ssr-and-hydration.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
