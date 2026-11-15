// l7 example: Point shape: dot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: dot",
  summary:
    "shape('dot') draws point sprites that add up where they overlap, so density shows as brightness. Slide the size to see the glow build.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'dot', 'size'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/tutorial/point/dot.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
