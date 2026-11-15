// penrose example: Two Substance versions of a water molecule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One water molecule, two Substance orders',
  summary:
    'A selector `Bond(o, h1); Bond(o, h2)` fixes the angle between the two hydrogens to 104.5 degrees. Substance may write the bonds as `Bond(O, H1)` or as `Bond(H1, O)`; because Bond is symmetric both versions match, and the third tab shows version 2 failing without the keyword.',
  section: 'Style: Selectors',
  tags: ['symmetric', 'predicate', 'where', 'match', 'subtype'],
  docs: ['repo/packages/docs-site/blog/new-language-features.md', 'repo/packages/docs-site/docs/ref/style/selectors.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
