// tanstack-charts example: facetChart wrapper
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "facetChart wrapper",
  summary:
    "facetChart builds the whole definition from rows and an options object: no defineChart, margin handled for you. The minWidth option decides the column count from the available width, and the chart callback receives each group's key so one region is drawn in amber.",
  section: "Text, Frame, and Facet",
  tags: ['facetChart', 'minWidth', 'chart', 'FacetChartContext'],
  docs: ['repo/docs/reference/marks/text-frame-and-facet.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
