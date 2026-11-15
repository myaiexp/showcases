// tanstack-charts example: normalize bases
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "normalize bases",
  summary:
    "normalize divides each value by a basis: sum gives shares, max scales to 1, extent maps min to 0 and max to 1, first and last index to a point in the series, and a function can compute any basis. The select applies each to the same series.",
  section: "Data Transforms",
  tags: ["normalize", "basis", "sum", "max", "extent", "first", "last", "lineY"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
