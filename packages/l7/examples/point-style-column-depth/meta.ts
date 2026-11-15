// l7 example: Column style: depth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Column style: depth",
  summary:
    "Depth testing (on by default) hides the parts of a column that sit behind another. With depth: false columns are simply painted in order, so a back column can appear in front of a near one.",
  section: "Point Layer",
  tags: ['PointLayer', 'style', 'depth', 'column', 'squareColumn'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
