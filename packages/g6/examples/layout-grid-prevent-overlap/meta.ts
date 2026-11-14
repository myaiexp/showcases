// g6 example: Grid layout: preventOverlap and nodeSpacing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid layout: preventOverlap and nodeSpacing",
  summary: "In a small grid area, large nodes collide. preventOverlap with nodeSize makes the cells at least that big, and preventOverlapPadding and nodeSpacing add room. A toggle and sliders drive it.",
  section: 'Layout',
  tags: ["grid", "preventOverlap", "preventOverlapPadding", "nodeSize", "nodeSpacing"],
  docs: [
    "repo/packages/site/docs/manual/layout/GridLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
