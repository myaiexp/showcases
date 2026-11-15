// vega example: Regression: Methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Regression: Methods",
  summary:
    "One scatter fitted with each regression method in turn: linear, log, exp, pow, quad and a cubic poly. The orange trend line is the transform's output, 1 to 10 along x.",
  section: 'Transforms: Basic',
  tags: ["transform.regression.method", "transform.regression.order", "transform.regression.extent", "transform.regression.as"],
  docs: ["repo/docs/docs/transforms/regression.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
