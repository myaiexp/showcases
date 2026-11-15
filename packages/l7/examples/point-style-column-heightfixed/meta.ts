// l7 example: Column style: heightfixed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Column style: heightfixed",
  summary:
    "Normally a column's size is a map distance, so zooming in makes it taller. With heightfixed it stays the same on screen. Zoom with the slider and compare both modes.",
  section: "Point Layer",
  tags: ['PointLayer', 'style', 'heightfixed', 'column', 'zoom'],
  docs: ['repo/site/docs/api/point_layer/style.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
