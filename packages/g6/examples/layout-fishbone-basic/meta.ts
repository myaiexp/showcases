// g6 example: Fishbone layout: cause-and-effect tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fishbone layout: cause-and-effect tree",
  summary: "The fishbone layout draws a tree as a fish skeleton: the root is the head and each branch is a rib with sub-causes along it. Built with treeToGraphData on the docs' Quality tree, polyline edges and rect nodes.",
  section: 'Layout',
  tags: ["fishbone", "treeToGraphData", "polyline", "rect"],
  docs: [
    "repo/packages/site/docs/manual/layout/Fishbone.en.md",
    "repo/packages/site/common/api/layout/fishbone.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
