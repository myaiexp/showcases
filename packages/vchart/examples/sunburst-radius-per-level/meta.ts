// vchart example: Sunburst: innerRadius and outerRadius per level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst: innerRadius and outerRadius per level",
  summary:
    "innerRadius and outerRadius accept arrays with one entry per level, so each ring gets its own band: a thin core, a wide middle ring, a hairline outer ring. A select switches between radius presets.",
  section: "Hierarchy",
  tags: ["innerRadius", "outerRadius"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sunburst.md",
    "repo/docs/assets/option/en/series/sunburst.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
