// l7 example: Scale: linear with a domain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale: linear with a domain",
  summary:
    "linear maps numbers smoothly onto the color list. domain sets which values reach the first and last color; drag the upper bound and values above it stay at the end color.",
  section: "Point Layer",
  tags: ['PointLayer', 'scale', 'linear', 'domain', 'color'],
  docs: ['repo/site/docs/api/point_layer/scale.en.md', 'repo/site/docs/api/common/layer/scale.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
