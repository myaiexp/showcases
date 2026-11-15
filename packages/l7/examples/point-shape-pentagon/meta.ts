// l7 example: Point shape: pentagon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: pentagon",
  summary:
    "A regular pentagon. shape('pentagon') is one of the IFillShape values; the full view's slider sets style.rotation.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'pentagon', 'IFillShape', 'rotation'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/point_layer/style.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
