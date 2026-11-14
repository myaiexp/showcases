// g6 example: ForceAtlas2 layout: barnesHut and prune
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ForceAtlas2 layout: barnesHut and prune",
  summary: "barnesHut speeds up repulsion with a quadtree and prune drops settled nodes from the iteration; both default to on for big graphs. Toggles force them on or off here.",
  section: 'Layout',
  tags: ["force-atlas2", "barnesHut", "prune"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceAtlas2Layout.en.md",
    "repo/packages/site/common/api/layout/force-atlas2.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
