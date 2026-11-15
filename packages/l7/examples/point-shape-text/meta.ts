// l7 example: Point shape: text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: text",
  summary:
    "shape(field, 'text') turns the points into text labels. The field's value is the text, size is the font size, and color and stroke style the glyphs.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'text', 'size', 'color', 'stroke'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/tutorial/point/text.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
