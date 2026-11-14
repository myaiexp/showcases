// vchart example: Treemap: aspectRatio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap: aspectRatio",
  summary:
    "With splitType squarify, aspectRatio is the target width-to-height ratio of each tile: 1 aims for squares, higher values allow wide tiles. A slider moves it; the preview sweeps it.",
  section: "Hierarchy",
  tags: ["aspectRatio", "splitType", "squarify"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Treemap.md",
    "repo/docs/assets/option/en/series/treemap.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
