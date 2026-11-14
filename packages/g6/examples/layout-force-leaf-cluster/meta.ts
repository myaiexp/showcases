// g6 example: Force layout: leafCluster
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: leafCluster",
  summary: "leafCluster gathers leaf nodes (degree 1) around the average centre of all leaves, away from the hubs they hang on. A toggle compares it with the plain layout.",
  section: 'Layout',
  tags: ["force", "leafCluster", "clusterNodeStrength"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
