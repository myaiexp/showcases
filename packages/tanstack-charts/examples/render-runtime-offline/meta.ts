// tanstack-charts example: A runtime that renders without mounting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A runtime that renders without mounting",
  summary:
    "createChartRuntime builds a runtime that compiles a definition at a given size and returns a scene, with no container, host or observer involved. The scene is serialized to SVG and inserted, and the readout reports its bounds, margins and scales. The sliders pick the size that is passed to runtime.render.",
  section: "Runtime and Scene",
  tags: ['createChartRuntime', 'runtime.render', 'runtime.destroy', 'renderChartSvg', 'ChartScene'],
  docs: ['repo/docs/reference/runtime-and-scene.md', 'repo/docs/guides/ssr-and-hydration.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
