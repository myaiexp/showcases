// penrose example: A house instead of sets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A house instead of sets',
  summary:
    'The welcome page explains a domain with a house: types such as `Plant` and `Furniture` that Penrose knows nothing about until Domain declares them. Substance lists the objects, and Style draws each type with an `Image`.',
  section: 'Tutorial: Basics',
  tags: ['type', 'Image', 'forall', 'domain'],
  docs: [
    'repo/packages/docs-site/docs/tutorial/welcome.md',
    'repo/packages/docs-site/docs/tutorial/basics.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
