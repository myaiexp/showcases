// vchart example: Treemap: maxDepth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap: maxDepth",
  summary:
    "maxDepth limits how many levels of the tree are drawn: at 1 only the top groups appear, each deeper value reveals another layer of nesting. A select picks the depth; the preview steps through it.",
  section: "Hierarchy",
  tags: ["maxDepth"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Treemap.md",
    "repo/docs/assets/option/en/series/treemap.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
