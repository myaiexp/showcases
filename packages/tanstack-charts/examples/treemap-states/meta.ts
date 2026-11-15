// tanstack-charts example: Highlighting a folder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Highlighting a folder",
  summary:
    "Each rendered node carries its ancestor ids, so a state callback can compare the focused tile with every other tile. Tiles in a different folder fade while the focused tile gets an outline.",
  section: "Treemap Mark",
  tags: ['treemap', 'states', 'ancestorIds', 'focus'],
  docs: ['repo/docs/reference/marks/treemap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
