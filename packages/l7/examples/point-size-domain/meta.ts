// l7 example: Point size: a list per category
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point size: a list per category",
  summary:
    "size(field, list) maps the field's values onto the list: types A, B and C get 10, 22 and 34 pixels.",
  section: "Point Layer",
  tags: ['PointLayer', 'size', 'domain', 'field mapping'],
  docs: ['repo/site/docs/api/point_layer/size.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
