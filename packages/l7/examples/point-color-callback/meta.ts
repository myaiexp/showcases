// l7 example: Point color: a callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point color: a callback",
  summary:
    "The callback gets the field's value and returns any color: here type A is water, B wood, the rest gray.",
  section: "Point Layer",
  tags: ['PointLayer', 'color', 'callback', 'field mapping'],
  docs: ['repo/site/docs/api/point_layer/color.en.md', 'repo/site/docs/api/common/layer/color.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
