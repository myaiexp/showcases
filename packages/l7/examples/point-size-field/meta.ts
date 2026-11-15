// l7 example: Point size: read from a field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point size: read from a field",
  summary:
    "With only a field name, size() uses each row's value as the radius directly: a row with r: 24 draws a radius-24 circle.",
  section: "Point Layer",
  tags: ['PointLayer', 'size', 'field mapping'],
  docs: ['repo/site/docs/api/point_layer/size.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
