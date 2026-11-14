// g6 example: Layout option animation: jump or glide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout option animation: jump or glide",
  summary: "With animation on, nodes glide to the new layout and iterative layouts show each iteration; with it off they jump to the result. A toggle flips the option between re-layouts.",
  section: 'Layout',
  tags: ["layout.animation", "setLayout", "layout()"],
  docs: [
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
    "repo/packages/site/docs/api/layout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
