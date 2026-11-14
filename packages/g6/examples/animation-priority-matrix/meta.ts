// g6 example: Animation: graph option against element option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: graph option against element option",
  summary: "Selects pick the graph animation setting and node.animation, then a button moves nodes. A line shows how long draw() took under that pair.",
  section: 'Animation',
  tags: ["animation", "node.animation", "draw"],
  docs: [
    "repo/packages/site/docs/manual/animation/animation.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
