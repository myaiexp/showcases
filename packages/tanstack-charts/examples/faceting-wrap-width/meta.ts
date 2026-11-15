// tanstack-charts example: Facets wrap as the width changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Facets wrap as the width changes",
  summary:
    "With minWidth and no columns, a facet grid fits as many columns as the width allows and wraps the rest. The slider narrows or widens the chart's container; the number of columns follows without any change to the definition.",
  section: "Faceting and Composition",
  tags: ["facetChart", "minWidth", "responsive"],
  docs: ["repo/docs/guides/faceting-and-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
