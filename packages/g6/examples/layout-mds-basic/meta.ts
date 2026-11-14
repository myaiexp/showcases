// g6 example: MDS layout: linkDistance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MDS layout: linkDistance",
  summary: "The MDS layout places nodes in the plane so that distances match graph distances, scaled by linkDistance. A slider changes linkDistance on a 25-node random graph.",
  section: 'Layout',
  tags: ["mds", "linkDistance", "center"],
  docs: [
    "repo/packages/site/docs/manual/layout/MdsLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
