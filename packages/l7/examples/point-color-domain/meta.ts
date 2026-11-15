// l7 example: Point color: a palette per category
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point color: a palette per category",
  summary:
    "color(field, list) maps the field's values to the listed colors in order: A is red, B green, C blue.",
  section: "Point Layer",
  tags: ['PointLayer', 'color', 'domain', 'field mapping'],
  docs: ['repo/site/docs/api/point_layer/color.en.md', 'repo/site/docs/api/common/layer/color.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
