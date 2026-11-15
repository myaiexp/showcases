// vega example: Identifier: Unique Keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Identifier: Unique Keys",
  summary:
    "Rows are added to two datasets over time. Each new row is stamped with an id by the identifier transform, and the one counter is shared, so ids count up across both columns.",
  section: 'Transforms: Basic',
  tags: ["transform.identifier.as"],
  docs: ["repo/docs/docs/transforms/identifier.md", "repo/docs/docs/transforms/window.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
