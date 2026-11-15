// vega example: Axis values and tickMinStep
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis values and tickMinStep",
  summary:
    "The top axis lists its tick values by hand; the bottom axis asks for 20 ticks but tickMinStep keeps them a whole unit apart.",
  section: "Axes",
  tags: ["axes.values","axes.tickMinStep","axes.tickCount"],
  docs: ["repo/docs/docs/axes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
