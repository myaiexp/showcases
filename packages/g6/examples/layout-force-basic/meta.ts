// g6 example: Force layout: preventOverlap, nodeSize, gravity and iterations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force layout: preventOverlap, nodeSize, gravity and iterations",
  summary: "The docs' force example: six nodes of different sizes with preventOverlap, nodeSize, gravity 0.9 and 100 iterations. A toggle grows node 1 to size 70; the layout re-runs and moves the neighbours aside.",
  section: 'Layout',
  tags: ["force", "preventOverlap", "nodeSize", "gravity", "iterations"],
  docs: [
    "repo/packages/site/docs/manual/layout/ForceLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
