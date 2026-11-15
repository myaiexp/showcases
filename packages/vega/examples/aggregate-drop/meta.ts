// vega example: Aggregate: Keeping Empty Groups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Aggregate: Keeping Empty Groups",
  summary:
    "A score histogram built with aggregate. Lowering the cutoff empties the high bins: drop true removes those groups (orange dots disappear), drop false keeps them as zero-height bars; the title counts each output.",
  section: 'Transforms: Basic',
  tags: ["transform.aggregate.drop", "transform.bin", "transform.filter"],
  docs: ["repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/transforms/bin.md", "repo/docs/docs/transforms/filter.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
