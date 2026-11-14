// g6 example: Custom node: clickable button shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom node: clickable button shape",
  summary:
    "A custom node with a round button shape that has its own click listener (stopPropagation, bound once); each press raises a counter in the label.",
  section: 'Node',
  tags: ['register', 'upsert', 'addEventListener', 'click', 'stopPropagation'],
  docs: ['repo/packages/site/docs/manual/element/node/custom-node.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
