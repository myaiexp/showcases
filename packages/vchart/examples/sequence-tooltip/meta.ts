// vchart example: Sequence: custom tooltips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sequence: custom tooltips",
  summary:
    "Dot and link series take their own tooltip.mark title and content, so hovering an event shows its service, type, time and node name while hovering a link shows its relation and its two ends. The card has no pointer, so it cycles the data instead.",
  section: "Flow and Relation",
  tags: ["tooltip", "mark", "title", "content", "hasShape", "shapeType"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sequence.md",
    "repo/docs/assets/option/en/chart/sequence.md",
    "repo/docs/assets/option/en/series/dot.md",
    "repo/docs/assets/option/en/series/link.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
