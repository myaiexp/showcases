// l7 example: Symbol map: shape callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol map: shape callback",
  summary:
    "The symbol's shape supports a callback too: it receives the field's value and returns an image id, so categories can be matched by rules instead of by list order.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'symbol', 'addImage', 'shape', 'callback'],
  docs: ['repo/site/docs/tutorial/point/symbol.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
