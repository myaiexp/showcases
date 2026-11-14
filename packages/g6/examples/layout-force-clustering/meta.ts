// g6 example: Force layout: clustering, nodeClusterBy and clusterNodeStrength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: clustering, nodeClusterBy and clusterNodeStrength",
  summary: "With clustering on, nodes sharing the nodeClusterBy field are pulled to their cluster centre with clusterNodeStrength. A toggle and a slider change them on the cluster dataset.",
  section: 'Layout',
  tags: ["force", "clustering", "nodeClusterBy", "clusterNodeStrength"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
