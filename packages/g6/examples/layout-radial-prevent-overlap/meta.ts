// g6 example: Radial layout: preventOverlap and strictRadial
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radial layout: preventOverlap and strictRadial",
  summary: "preventOverlap pushes overlapping nodes apart using nodeSize and nodeSpacing; strictRadial keeps same-layer nodes on one ring, and with it off the rings relax. Toggles and a slider drive them.",
  section: 'Layout',
  tags: ["radial", "preventOverlap", "strictRadial", "nodeSpacing"],
  docs: [
    "repo/packages/site/docs/manual/layout/RadialLayout.en.md",
    "repo/packages/site/common/api/layouts/radial.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
