// vega example: Axis tickCount on a Linear Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis tickCount on a Linear Scale",
  summary:
    "A numeric tickCount is only a hint: the axis picks nice values near it. The count cycles from 2 to 40 and is printed above the axis.",
  section: "Axes",
  tags: ["axes.tickCount","axes.tickMinStep"],
  docs: ["repo/docs/docs/axes.md","repo/docs/docs/scales.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
