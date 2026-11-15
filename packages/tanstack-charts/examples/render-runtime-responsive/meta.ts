// tanstack-charts example: A responsive definition at exact sizes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A responsive definition at exact sizes",
  summary:
    "A definition written as a function of the surface size is compiled by a runtime at 320, 640 and 960 pixels. The builder turns point markers and a tick count on or off by width, so the scenes differ in node count and tick count. The readout lists what each size produced.",
  section: "Runtime and Scene",
  tags: ['createChartRuntime', 'responsive definition', 'ChartBuildContext', 'width'],
  docs: ['repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
