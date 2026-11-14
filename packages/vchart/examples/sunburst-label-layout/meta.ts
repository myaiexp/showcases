// vchart example: Sunburst: labelLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst: labelLayout",
  summary:
    "labelLayout takes one entry per level with align (start, center, end), rotate (tangential or radial) and offset; null skips layout for that level. labelAutoVisible hides labels on arcs shorter than a circumference threshold.",
  section: "Hierarchy",
  tags: ["labelLayout", "align", "rotate", "offset", "labelAutoVisible"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sunburst.md",
    "repo/docs/assets/option/en/series/sunburst.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
