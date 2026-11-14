// g6 example: Grid layout: position callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid layout: position callback",
  summary: "position returns a row and column for chosen nodes, which are put there before the rest fill the free cells. A toggle pins the highest-valued nodes to the first row.",
  section: 'Layout',
  tags: ["grid", "position", "rows", "cols"],
  docs: [
    "repo/packages/site/docs/manual/layout/GridLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
