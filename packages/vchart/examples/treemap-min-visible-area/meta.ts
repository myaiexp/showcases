// vchart example: Treemap: minVisibleArea
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap: minVisibleArea",
  summary:
    "Rectangles smaller than minVisibleArea square pixels are dropped, and minChildrenVisibleArea hides the children of a small parent. Raising the sliders prunes the smallest tiles instead of leaving unreadable slivers.",
  section: "Hierarchy",
  tags: ["minVisibleArea", "minChildrenVisibleArea"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Treemap.md",
    "repo/docs/assets/option/en/series/treemap.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
