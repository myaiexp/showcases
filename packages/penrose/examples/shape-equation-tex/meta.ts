// penrose example: Equation from TeX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Equation from TeX',
  summary:
    'An Equation reads its `string` as math-mode TeX, so `\\frac`, `\\sum` and `\\int` work, unlike a Text shape that would print the backslashes. The tabs typeset three formulas at the same size.',
  section: 'Shape: Equation',
  tags: ['Equation', 'string', 'fontSize', 'TeX'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/equation.md',
    'repo/packages/core/src/shapes/Equation.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
