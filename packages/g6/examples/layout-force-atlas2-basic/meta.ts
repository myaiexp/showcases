// g6 example: ForceAtlas2 layout: the docs' 15-node graph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ForceAtlas2 layout: the docs' 15-node graph",
  summary: "force-atlas2 with preventOverlap and kr 20 on a 15-node ring with chords. A toggle switches preventOverlap, which uses nodeSize to keep nodes apart.",
  section: 'Layout',
  tags: ["force-atlas2", "preventOverlap", "kr", "nodeSize"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceAtlas2Layout.en.md",
    "repo/packages/site/common/api/layout/force-atlas2.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
