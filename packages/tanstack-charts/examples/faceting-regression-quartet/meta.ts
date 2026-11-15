// tanstack-charts example: Four sets, one fitted line each
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Four sets, one fitted line each",
  summary:
    "Four point sets with a similar fitted line and very different shapes, one per facet with a regression line over the points. Shared domains make the cells comparable: the line alone would hide the curve, the outlier and the vertical cluster.",
  section: "Faceting and Composition",
  tags: ["facetChart", "linearRegressionY", "dot", "scaleLinear"],
  docs: ['repo/docs/guides/faceting-and-composition.md', 'repo/docs/reference/marks/regression.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
