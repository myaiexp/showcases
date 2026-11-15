// l7 example: Scale: quantile classes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale: quantile classes",
  summary:
    "quantile puts the same number of points in each color class, so a skewed field still fills every color evenly. Compare with the quantize example on the same kind of data.",
  section: "Point Layer",
  tags: ['PointLayer', 'scale', 'quantile', 'color', 'quakes'],
  docs: ['repo/site/docs/api/point_layer/scale.en.md', 'repo/site/docs/api/common/layer/scale.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
