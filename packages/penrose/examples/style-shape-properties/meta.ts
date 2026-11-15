// penrose example: Reading and writing shape properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reading and writing shape properties',
  summary:
    'A shape is declared with `Circle { r : 50 }` and every property can be read back with a path such as `x.shape.r`. Here the centre is set after the declaration with `override x.shape.center = (…)`, and the caption sits relative to `x.shape.center[0]` and `x.shape.r`, read back from the circle itself.',
  section: 'Style: Expressions',
  tags: ['Circle', 'property', 'center', 'index', 'dot operator'],
  docs: ['repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
