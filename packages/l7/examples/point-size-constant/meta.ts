// l7 example: Point size: one radius for all
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point size: one radius for all",
  summary:
    "A plain number is the radius in pixels for every point. Change it later with size() followed by scene.render().",
  section: "Point Layer",
  tags: ['PointLayer', 'size', 'render'],
  docs: ['repo/site/docs/api/point_layer/size.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
