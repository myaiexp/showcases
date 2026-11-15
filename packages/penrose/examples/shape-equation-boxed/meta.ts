// penrose example: Equation labels in boxes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Equation labels in boxes',
  summary:
    'Each set has a TeX Substance label that feeds an Equation, and a Rectangle copies its `width`, `height` and `center` plus padding. Equations are measured after MathJax typesets them, so the box hugs real glyph sizes.',
  section: 'Shape: Equation',
  tags: ['Equation', 'width', 'height', 'center', 'Label', 'Rectangle'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/equation.md', 'repo/packages/core/src/shapes/Equation.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
