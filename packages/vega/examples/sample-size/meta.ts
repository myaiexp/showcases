// vega example: Sample: Reservoir Size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sample: Reservoir Size",
  summary:
    "Four hundred grey points with the sampled subset in orange. The size signal sets the reservoir: 10 rows is a sparse scatter, 400 selects everything.",
  section: 'Transforms: Basic',
  tags: ["transform.sample.size"],
  docs: ["repo/docs/docs/transforms/sample.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
