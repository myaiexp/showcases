// l7 example: Simple points: the size limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Simple points: the size limit",
  summary:
    "Sprite size has a device limit, generally [1, 64]; scene.getPointSizeRange() reports it. Push the slider past it and the simple points stop growing while the circles keep going.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'simple', 'size', 'getPointSizeRange'],
  docs: ['repo/site/docs/tutorial/point/simple.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
