// l7 example: Simple points always face the camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Simple points always face the camera",
  summary:
    "A simple point layer is a sprite map, so it always faces the camera; a normal 2D point layer lies on the map and foreshortens when tilted. Switch the shape with the select.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'simple', 'circle', 'pitch', 'sprite'],
  docs: ['repo/site/docs/tutorial/point/simple.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
