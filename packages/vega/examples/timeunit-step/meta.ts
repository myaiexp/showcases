// vega example: Timeunit: Step and Interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timeunit: Step and Interval",
  summary:
    "Events binned by ISO week and year, 1, 2, 4 or 8 weeks at a time. With interval off only the bin's start is written, so the bars are redrawn at a fixed width from unit0.",
  section: 'Transforms: Basic',
  tags: ["transform.timeunit.step", "transform.timeunit.interval", "transform.timeunit.units"],
  docs: ["repo/docs/docs/transforms/timeunit.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
