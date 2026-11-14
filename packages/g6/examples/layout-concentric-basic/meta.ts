// g6 example: Concentric layout: degree rings and preventOverlap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Concentric layout: degree rings and preventOverlap",
  summary: "The concentric layout places the nodes with the highest degree in the middle and the rest on rings around them. A toggle switches preventOverlap, which spaces nodes by nodeSize.",
  section: 'Layout',
  tags: ["concentric", "sortBy", "nodeSize", "preventOverlap"],
  docs: [
    "repo/packages/site/docs/manual/layout/ConcentricLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
