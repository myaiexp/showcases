// g6 example: Shape: label shown by a node state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: label shown by a node state",
  summary: "The node label is off by default and each state turns it on with its own labelText and background.",
  section: 'Shape',
  tags: ["node.state", "label", "labelText", "labelBackground", "setElementState"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/label-shape.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
