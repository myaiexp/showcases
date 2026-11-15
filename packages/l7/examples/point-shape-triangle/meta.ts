// l7 example: Point shape: triangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: triangle",
  summary:
    "An equilateral triangle; rotation shows which way it points. shape('triangle') is one of the IFillShape values; the full view's slider sets style.rotation.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'triangle', 'IFillShape', 'rotation'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/point_layer/style.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
