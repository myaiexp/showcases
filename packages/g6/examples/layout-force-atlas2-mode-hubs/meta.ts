// g6 example: ForceAtlas2 layout: mode and dissuadeHubs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ForceAtlas2 layout: mode and dissuadeHubs",
  summary: "mode linlog makes clusters tighter than normal, and dissuadeHubs moves nodes with high in-degree toward the centre. A select and a toggle change them.",
  section: 'Layout',
  tags: ["force-atlas2", "mode", "dissuadeHubs"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceAtlas2Layout.en.md",
    "repo/packages/site/common/api/layout/force-atlas2.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
