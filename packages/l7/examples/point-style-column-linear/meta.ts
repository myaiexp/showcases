// l7 example: Column style: sourceColor and targetColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Column style: sourceColor and targetColor",
  summary:
    "sourceColor is the color at the bottom of each column and targetColor the one at the top; the column blends between them. Once set, they override color().",
  section: "Point Layer",
  tags: ['PointLayer', 'style', 'column', 'sourceColor', 'targetColor', 'gradient'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
