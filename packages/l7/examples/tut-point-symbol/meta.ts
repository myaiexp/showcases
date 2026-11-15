// l7 example: Symbol map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol map",
  summary:
    "Add images to the scene under ids, then let shape('type', ['00', '01', '02']) pick one per category. The ids must not equal a built-in shape name such as circle.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'symbol', 'addImage', 'shape', 'icon'],
  docs: ['repo/site/docs/tutorial/point/symbol.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
