// l7 example: Symbol map: billboard off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol map: billboard off",
  summary:
    "By default symbols are sprites: always facing the camera, size-limited and not rotatable. layerType 'fillImage' with billboard: false draws them flat on the map, so they tilt with it and take a rotation.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'symbol', 'billboard', 'fillImage', 'rotation', 'layerType'],
  docs: ['repo/site/docs/tutorial/point/symbol.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
