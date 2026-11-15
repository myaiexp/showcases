// l7 example: Point shape: circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: circle",
  summary:
    "The default 2D fill shape: a round dot lying on the map. shape('circle') is one of the IFillShape values; the full view's slider sets style.rotation.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'circle', 'IFillShape', 'rotation'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/point_layer/style.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
