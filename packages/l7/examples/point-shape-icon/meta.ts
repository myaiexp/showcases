// l7 example: Point shape: icon image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: icon image",
  summary:
    "scene.addImage(id, url) registers an image page-wide; shape(id) then draws every point with it. Here the images are drawn on a canvas, so nothing is fetched.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'addImage', 'icon', 'size'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
