// vchart example: Circle packing: layoutPadding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circle packing: layoutPadding",
  summary:
    "layoutPadding is the inner padding of each level of nested circles; an array sets it per level, so the outer circles can breathe while leaves stay packed. Sliders change the padding of the three inner levels.",
  section: "Hierarchy",
  tags: ["layoutPadding"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/CirclePacking.md",
    "repo/docs/assets/option/en/series/circle-packing.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
