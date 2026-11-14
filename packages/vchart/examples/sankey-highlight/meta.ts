// vchart example: Sankey: emphasis effects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: emphasis effects",
  summary:
    "emphasis picks what a node interaction lights up: self highlights only the node, adjacency its direct neighbours and links, related the whole upstream and downstream path. trigger chooses click or hover; blur states fade everything else. The card plays the highlights from code.",
  section: "Flow and Relation",
  tags: ["emphasis", "trigger", "effect", "self", "adjacency", "related", "blur"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
