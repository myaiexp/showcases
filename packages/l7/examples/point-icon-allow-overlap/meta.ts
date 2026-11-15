// l7 example: Icon style: allowOverlap and padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Icon style: allowOverlap and padding",
  summary:
    "With allowOverlap: false L7 hides any icon that overlaps one already placed, after every pan or zoom. padding adds a margin to each icon's box so neighbors keep their distance.",
  section: "Point Layer",
  tags: ['PointLayer', 'icon', 'style', 'allowOverlap', 'padding', 'collision'],
  docs: ['repo/site/docs/api/point_layer/style.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
