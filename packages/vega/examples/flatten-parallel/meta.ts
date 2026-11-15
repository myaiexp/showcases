// vega example: Flatten: Parallel Arrays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flatten: Parallel Arrays",
  summary:
    "Two rows with array fields foo and bar of different lengths, flattened together. Where bar runs short the output has a null (an empty circle and a dash in the table).",
  section: 'Transforms: Basic',
  tags: ["transform.flatten.fields"],
  docs: ["repo/docs/docs/transforms/flatten.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
