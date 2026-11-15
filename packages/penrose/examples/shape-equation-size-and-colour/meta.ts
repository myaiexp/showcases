// penrose example: Equation fontSize and fillColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Equation fontSize and fillColor',
  summary:
    'The same formula at `fontSize` "22px", "40px" and "58px", each with its own `fillColor`. The size is a string, so any CSS unit would do, and the glyphs scale as vectors.',
  section: 'Shape: Equation',
  tags: ['Equation', 'fontSize', 'fillColor'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/equation.md',
    'repo/packages/core/src/shapes/Equation.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
