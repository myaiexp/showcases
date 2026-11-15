// vega example: Axis tickCount as a Time Interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis tickCount as a Time Interval",
  summary:
    "On a time scale tickCount can be an interval name or an {interval, step} object: months, quarters via step 3, weeks, days.",
  section: "Axes",
  tags: ["axes.tickCount","scale.type","time.interval"],
  docs: ["repo/docs/docs/axes.md","repo/docs/docs/scales.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
