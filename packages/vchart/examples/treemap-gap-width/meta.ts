// vchart example: Treemap: gapWidth per level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap: gapWidth per level",
  summary:
    "gapWidth is the space between sibling rectangles; an array sets it level by level, so top-level groups can be separated widely while leaves stay tight. Sliders change the three levels.",
  section: "Hierarchy",
  tags: ["gapWidth"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Treemap.md",
    "repo/docs/assets/option/en/series/treemap.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
