// tanstack-charts example: Build the shared domain once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Build the shared domain once",
  summary:
    "One y domain is computed from every row and the same configured scale goes to every facet, so cells are comparable. The select switches to a domain fitted to each cell, which makes small variation easy to see and exaggerates the difference between groups; the caption labels the policy.",
  section: "Faceting and Composition",
  tags: ["facetChart", "scaleLinear", "domain", "axes"],
  docs: ["repo/docs/guides/faceting-and-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
