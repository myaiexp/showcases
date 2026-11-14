// g6 example: Circular layout: basic ring and clockwise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circular layout: basic ring and clockwise",
  summary: "The circular layout puts all nodes of a 34-node graph evenly on one ring in data order. A toggle flips clockwise, which reverses the order around the ring.",
  section: 'Layout',
  tags: ["circular", "clockwise", "labelPlacement"],
  docs: [
    "repo/packages/site/docs/manual/layout/CircularLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
