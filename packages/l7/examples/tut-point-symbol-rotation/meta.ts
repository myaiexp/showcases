// l7 example: Symbol map: rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol map: rotation",
  summary:
    "In non-billboard mode rotation (degrees, clockwise) takes a constant, { field, value: [0, 360] } or { field, value: callback }. Pick a form; the arrows turn accordingly.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'symbol', 'rotation', 'billboard', 'field mapping', 'fillImage'],
  docs: ['repo/site/docs/tutorial/point/symbol.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
