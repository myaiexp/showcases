// g6 example: Dagre layout: ranker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dagre layout: ranker",
  summary: "dagre assigns ranks with network-simplex, tight-tree or longest-path. A select switches the ranker; longest-path pushes sources down and leaves longer edges.",
  section: 'Layout',
  tags: ["dagre", "ranker"],
  docs: [
    "repo/packages/site/docs/manual/layout/DagreLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
