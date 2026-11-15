// vega example: Axis Orientation from a Signal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis Orientation from a Signal",
  summary:
    "Signals choose each axis's side, so the same x axis hops between bottom and top and the y axis between left and right; the full view has selects for both.",
  section: "Axes",
  tags: ["axes.orient","signal.bind","signals"],
  docs: ["repo/docs/docs/axes.md","repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
