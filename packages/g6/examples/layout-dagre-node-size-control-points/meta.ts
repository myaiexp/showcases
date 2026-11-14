// g6 example: Dagre layout: nodeSize and controlPoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dagre layout: nodeSize and controlPoints",
  summary: "nodeSize gives dagre a size per node and controlPoints keeps the computed edge routes. A toggle shows the routes with and without the node sizes taken into account.",
  section: 'Layout',
  tags: ["dagre", "nodeSize", "controlPoints"],
  docs: [
    "repo/packages/site/docs/manual/layout/DagreLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
