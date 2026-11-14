// g6 example: Dagre layout: rankdir and align
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dagre layout: rankdir and align",
  summary: "The dagre layout takes rankdir (TB, BT, LR, RL) and align (UL, UR, DL, DR). Two selects set them on nodes of mixed sizes.",
  section: 'Layout',
  tags: ["dagre", "rankdir", "align"],
  docs: [
    "repo/packages/site/docs/manual/layout/DagreLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
