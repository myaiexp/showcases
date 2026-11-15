// penrose example: Math labels with $…$
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Math labels with $…$',
  summary:
    'A label between dollar signs is TeX: `Label A $A_0$`. Style shows it with an `Equation` shape, which typesets the formula, where a `Text` shape would print the dollar signs and all.',
  section: 'Substance',
  tags: ['Label', 'label', 'Equation', 'TeX'],
  docs: ['repo/packages/docs-site/docs/ref/substance/statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
