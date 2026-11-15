// vega example: Axis Grid Lines and gridScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis Grid Lines and gridScale",
  summary:
    "Grid lines drawn by the bottom and left axes; gridScale makes each set span the range of the other scale, so they stop at the inset plot area. Dash and colour cycle.",
  section: "Axes",
  tags: ["axes.grid","axes.gridScale","axes.gridDash","axes.gridColor","axes.gridOpacity"],
  docs: ["repo/docs/docs/axes.md","repo/docs/docs/config.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
