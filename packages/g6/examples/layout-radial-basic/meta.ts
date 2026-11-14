// g6 example: Radial layout: unitRadius and linkDistance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radial layout: unitRadius and linkDistance",
  summary: "The radial layout puts nodes on rings around the focus node by graph distance. unitRadius sets the spacing between rings and linkDistance the ideal edge length; sliders change them.",
  section: 'Layout',
  tags: ["radial", "unitRadius", "linkDistance", "nodeSize"],
  docs: [
    "repo/packages/site/docs/manual/layout/RadialLayout.en.md",
    "repo/packages/site/common/api/layouts/radial.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
