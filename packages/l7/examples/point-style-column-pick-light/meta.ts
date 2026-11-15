// l7 example: Column style: pickLight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Column style: pickLight",
  summary:
    "Hover a column to highlight it with active(). With pickLight on, the highlight is computed with the lighting too, so faces stay shaded; off, the highlight is a flat color.",
  section: "Point Layer",
  tags: ['PointLayer', 'style', 'pickLight', 'active', 'column'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
