// l7 example: Scale: identity for literal values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale: identity for literal values",
  summary:
    "identity is the constant scale: the field passes through unchanged. Here c holds a color per row and the scale makes sure it is used as written.",
  section: "Point Layer",
  tags: ['PointLayer', 'scale', 'identity', 'color'],
  docs: ['repo/site/docs/api/point_layer/scale.en.md', 'repo/site/docs/api/common/layer/scale.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
