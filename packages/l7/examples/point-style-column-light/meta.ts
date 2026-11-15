// l7 example: Column style: lightEnable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Column style: lightEnable",
  summary:
    "With lightEnable (the default) column faces are shaded by the scene light, which gives them depth. Turn it off and each column is one flat color.",
  section: "Point Layer",
  tags: ['PointLayer', 'style', 'lightEnable', 'column', 'cylinder'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
