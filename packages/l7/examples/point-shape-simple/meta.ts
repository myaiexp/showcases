// l7 example: Point shape: simple
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: simple",
  summary:
    "shape('simple') draws sprites: efficient, always facing the camera, and capped in size by the device. The readout shows the range scene.getPointSizeRange() reports.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'simple', 'getPointSizeRange', 'size'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/tutorial/point/simple.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
