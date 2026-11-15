// tanstack-charts example: The runtime's default theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The runtime's default theme",
  summary:
    "createChartRuntime takes a defaultTheme that a responsive builder receives as defaultTheme and that scene compilation applies before the authored theme. The same builder is rendered by a plain runtime and by one with a light platform theme, and the readout prints defaultChartTheme next to what the builder saw.",
  section: "Runtime and Scene",
  tags: ['createChartRuntime', 'defaultTheme', 'defaultChartTheme', 'ChartBuildContext'],
  docs: [
    'repo/docs/reference/runtime-and-scene.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/reference/rendering-and-export.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
