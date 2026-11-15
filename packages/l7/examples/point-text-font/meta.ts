// l7 example: Text style: fontWeight and fontFamily
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text style: fontWeight and fontFamily",
  summary:
    "fontFamily takes a CSS font family and fontWeight a CSS weight; both are baked into the label texture, so changing them rebuilds the layer.",
  section: "Point Layer",
  tags: ['PointLayer', 'text', 'style', 'fontWeight', 'fontFamily'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/point_layer/shape.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
