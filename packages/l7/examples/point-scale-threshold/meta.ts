// l7 example: Scale: threshold breaks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale: threshold breaks",
  summary:
    "threshold takes your own break values: with domain [3, 6] the range needs three colors, for below 3, 3 to 6 and above 6. Move the breaks to reclassify.",
  section: "Point Layer",
  tags: ['PointLayer', 'scale', 'threshold', 'domain', 'color'],
  docs: ['repo/site/docs/api/point_layer/scale.en.md', 'repo/site/docs/api/common/layer/scale.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
