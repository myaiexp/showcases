// vchart example: Sunburst: centre and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst: centre and offset",
  summary:
    "centerX and centerY fix the centre of the sunburst in pixels and offsetX and offsetY nudge it from wherever it sits. Sliders move the offset; the card drifts the chart around its container.",
  section: "Hierarchy",
  tags: ["centerX", "centerY", "offsetX", "offsetY"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sunburst.md",
    "repo/docs/assets/option/en/series/sunburst.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
