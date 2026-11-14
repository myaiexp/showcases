// vchart example: Progressive rendering: box plot slices
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Progressive rendering: box plot slices",
  summary:
    "A box plot with progressiveThreshold 10 and a progressiveStep of one to three boxes, so the boxes appear a few at a time. The full view sets the number of groups and the step.",
  section: "Progressive Rendering",
  tags: ['progressiveStep','progressiveThreshold','boxPlot'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Progressive_Render.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
