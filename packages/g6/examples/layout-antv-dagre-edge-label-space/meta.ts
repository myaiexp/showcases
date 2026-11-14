// g6 example: AntvDagre layout: edgeLabelSpace
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AntvDagre layout: edgeLabelSpace",
  summary: "With edgeLabelSpace on, dagre adds a dummy node in the middle of every edge so labels get room; off, ranks sit closer. A toggle flips it on a graph with labelled edges.",
  section: 'Layout',
  tags: ["antv-dagre", "edgeLabelSpace"],
  docs: [
    "repo/packages/site/docs/manual/layout/AntvDagreLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
