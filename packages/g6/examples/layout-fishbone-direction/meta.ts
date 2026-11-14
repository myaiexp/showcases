// g6 example: Fishbone layout: direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fishbone layout: direction",
  summary: "direction RL puts the head on the right and LR on the left. A select switches it and the view is fitted again, since the spine flips to the other side.",
  section: 'Layout',
  tags: ["fishbone", "direction", "setLayout", "fitView"],
  docs: [
    "repo/packages/site/docs/manual/layout/Fishbone.en.md",
    "repo/packages/site/common/api/layout/fishbone.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
