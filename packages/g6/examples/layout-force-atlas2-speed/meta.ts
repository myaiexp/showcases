// g6 example: ForceAtlas2 layout: ks, ksmax and tao
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ForceAtlas2 layout: ks, ksmax and tao",
  summary: "ks sets how fast nodes move per iteration, ksmax caps that speed and tao is the tolerance for stopping oscillation near convergence. Sliders set them.",
  section: 'Layout',
  tags: ["force-atlas2", "ks", "ksmax", "tao"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceAtlas2Layout.en.md",
    "repo/packages/site/common/api/layout/force-atlas2.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
