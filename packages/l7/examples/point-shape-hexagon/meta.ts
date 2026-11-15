// l7 example: Point shape: hexagon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: hexagon",
  summary:
    "A regular hexagon, a natural fit for binned or honeycomb-style points. shape('hexagon') is one of the IFillShape values; the full view's slider sets style.rotation.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'hexagon', 'IFillShape', 'rotation'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/point_layer/style.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
