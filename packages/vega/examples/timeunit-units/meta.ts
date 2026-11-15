// vega example: Timeunit: Units
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timeunit: Units",
  summary:
    "Three hundred dated events binned by different unit lists. year + month gives a timeline, month or day regardless of year folds both years onto 2012 (a cyclical unit), and the bound signal reports the smallest unit.",
  section: 'Transforms: Basic',
  tags: ["transform.timeunit.units", "transform.timeunit.timezone", "transform.timeunit.signal", "transform.timeunit.as"],
  docs: ["repo/docs/docs/transforms/timeunit.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
