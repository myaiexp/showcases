// g6 example: Grid layout: sortBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid layout: sortBy",
  summary: "sortBy orders the nodes before they are placed in the grid: by degree, by id, or with a comparison function over node data. A select switches the order.",
  section: 'Layout',
  tags: ["grid", "sortBy", "degree"],
  docs: [
    "repo/packages/site/docs/manual/layout/GridLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
