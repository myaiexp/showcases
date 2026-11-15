// tanstack-charts example: A histogram in every cell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A histogram in every cell",
  summary:
    "Each facet runs binX on its own rows, with the same thresholds and domain in every cell so the bars line up and the outer axes are shared. The slider changes the number of bins for all cells at once.",
  section: "Faceting and Composition",
  tags: ["facetChart", "binX", "rect"],
  docs: ["repo/docs/guides/faceting-and-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
