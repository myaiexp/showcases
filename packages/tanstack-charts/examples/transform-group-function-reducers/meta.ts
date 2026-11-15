// tanstack-charts example: Tree-shakeable reducer functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tree-shakeable reducer functions",
  summary:
    "median, variance, deviation, first, last, delta and ratio are imported as functions, so a bundle only pays for the ones it uses. They go in reduce like a built-in name. The select moves through all seven over the same per-region order amounts and the readout shows the numbers.",
  section: "Data Transforms",
  tags: ["groupBy", "median", "variance", "deviation", "first", "last", "delta", "ratio"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
