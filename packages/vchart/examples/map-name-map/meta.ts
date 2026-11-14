// vchart example: Map: nameMap for mismatched names
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map: nameMap for mismatched names",
  summary:
    "The data calls countries USA, UK and DR Congo while the base map says United States of America and so on. With nameMap the rows find their regions; without it those three stay unfilled.",
  section: "Map",
  tags: ['nameMap','nameField','defaultFillColor','map'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Map.md',
    'repo/docs/assets/option/en/series/map.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
