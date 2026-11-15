// l7 example: Point shape: icons mapped from a field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: icons mapped from a field",
  summary:
    "Like color(), shape accepts a field and a list: each category takes the next image id. The ids must not collide with built-in shape names such as circle.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'addImage', 'icon', 'field mapping'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
