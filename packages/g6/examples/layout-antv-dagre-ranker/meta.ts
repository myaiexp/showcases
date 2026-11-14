// g6 example: AntvDagre layout: ranker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AntvDagre layout: ranker",
  summary: "ranker picks how nodes are assigned to ranks: network-simplex, tight-tree or longest-path. A select compares the three on one graph.",
  section: 'Layout',
  tags: ["antv-dagre", "ranker"],
  docs: [
    "repo/packages/site/docs/manual/layout/AntvDagreLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
