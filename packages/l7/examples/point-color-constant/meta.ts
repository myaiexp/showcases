// l7 example: Point color: one color for all
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point color: one color for all",
  summary:
    "color() takes hex, rgb()/rgba() and named colors. Pick one below; the layer re-renders with color() and scene.render().",
  section: "Point Layer",
  tags: ['PointLayer', 'color', 'render'],
  docs: ['repo/site/docs/api/point_layer/color.en.md', 'repo/site/docs/api/common/layer/color.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
