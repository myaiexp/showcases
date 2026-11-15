// l7 example: Point size: a callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point size: a callback",
  summary:
    "The callback receives the field's value and returns the radius, so thresholds and formulas are free: here mag above 6 is large, above 3 medium.",
  section: "Point Layer",
  tags: ['PointLayer', 'size', 'callback', 'field mapping'],
  docs: ['repo/site/docs/api/point_layer/size.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
