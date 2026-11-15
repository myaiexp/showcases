// l7 example: Text style: halo and gamma
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text style: halo and gamma",
  summary:
    "halo is the width of the glow at the glyph edge (default 0.5) and gamma tunes the edge's color blend (default 2). Together with stroke they decide how crisp or soft the text looks.",
  section: "Point Layer",
  tags: ['PointLayer', 'text', 'style', 'halo', 'gamma'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
