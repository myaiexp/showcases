// g6 example: Fruchterman layout: clustering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fruchterman layout: clustering",
  summary: "With clustering on, nodes with the same nodeClusterBy field are pulled toward their cluster centre, with clusterGravity setting the pull. A toggle and a slider change them on the cluster dataset.",
  section: 'Layout',
  tags: ["fruchterman", "clustering", "nodeClusterBy", "clusterGravity", "palette"],
  docs: [
    "repo/packages/site/docs/manual/layout/FruchtermanLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
