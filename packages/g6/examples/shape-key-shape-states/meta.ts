// g6 example: Shape: states restyle the keyShape only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: states restyle the keyShape only",
  summary: "A custom node draws a key circle and a separate dashed ring. Node states restyle the key circle and leave the ring alone.",
  section: 'Shape',
  tags: ["keyShape", "node.state", "setElementState", "upsert"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/overview.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
