// g6 example: Force layout: preventOverlap, nodeSpacing and collideStrength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: preventOverlap, nodeSpacing and collideStrength",
  summary: "With preventOverlap the layout adds a collision force sized by nodeSize; nodeSpacing adds a margin and collideStrength sets how hard nodes are pushed apart. A toggle and sliders drive them on big, crowded nodes.",
  section: 'Layout',
  tags: ["force", "preventOverlap", "nodeSize", "nodeSpacing", "collideStrength"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
