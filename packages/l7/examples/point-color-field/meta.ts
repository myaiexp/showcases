// l7 example: Point color: read from a field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point color: read from a field",
  summary:
    "With a field name alone, color() reads each row's own color string: the data decides, there is no palette.",
  section: "Point Layer",
  tags: ['PointLayer', 'color', 'field mapping'],
  docs: ['repo/site/docs/api/point_layer/color.en.md', 'repo/site/docs/api/common/layer/color.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
