// l7 example: Text style: padding and collisions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text style: padding and collisions",
  summary:
    "Each label has a bounding box and labels that overlap are hidden. padding grows that box, so a larger value hides more neighbors and keeps labels apart.",
  section: "Point Layer",
  tags: ['PointLayer', 'text', 'style', 'padding', 'collision'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
