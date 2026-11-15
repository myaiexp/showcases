// l7 example: Point style: unit meter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point style: unit meter",
  summary:
    "The default unit is pixel: the same size at every zoom. With unit: 'meter' size is a real distance (here 130 km), so the orange circles grow and shrink with the map while the blue ones stay put.",
  section: "Point Layer",
  tags: ['PointLayer', 'style', 'unit', 'meter', 'pixel', 'size'],
  docs: ['repo/site/docs/api/point_layer/style.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
