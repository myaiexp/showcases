// g6 example: Shape: keyShape decides where edges end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: keyShape decides where edges end",
  summary: "Each node draws a rect and a dashed circle. Edges end on whichever one is the key shape, switched by the select.",
  section: 'Shape',
  tags: ["keyShape", "upsert", "BaseNode", "node.type"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/overview.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
