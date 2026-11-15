// l7 example: Scale: quantize classes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale: quantize classes",
  summary:
    "quantize cuts the value range into equal-width classes, so skewed data piles into the first colors and the top color is rare.",
  section: "Point Layer",
  tags: ['PointLayer', 'scale', 'quantize', 'color', 'quakes'],
  docs: ['repo/site/docs/api/point_layer/scale.en.md', 'repo/site/docs/api/common/layer/scale.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
