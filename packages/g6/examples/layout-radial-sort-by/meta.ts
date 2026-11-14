// g6 example: Radial layout: sortBy and sortStrength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radial layout: sortBy and sortStrength",
  summary: "sortBy orders the nodes of one ring ('data' keeps the data order, or any node field) and sortStrength sets how hard that order is pulled in. A select and a slider change them.",
  section: 'Layout',
  tags: ["radial", "sortBy", "sortStrength"],
  docs: [
    "repo/packages/site/docs/manual/layout/RadialLayout.en.md",
    "repo/packages/site/common/api/layouts/radial.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
