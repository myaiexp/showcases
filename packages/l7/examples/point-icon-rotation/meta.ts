// l7 example: Icon style: rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Icon style: rotation",
  summary:
    "A plain icon layer is a sprite that always faces the camera, so it cannot rotate. layerType: 'fillImage' draws them as flat images, and style.rotation then turns each by its own angle, here mapped from a field.",
  section: "Point Layer",
  tags: ['PointLayer', 'icon', 'style', 'rotation', 'fillImage', 'layerType', 'addImage'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/tutorial/point/symbol.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
