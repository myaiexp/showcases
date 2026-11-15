// penrose example: Why the size bound matters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Why the size bound matters',
  summary:
    'Without `ensure x.icon.r > 25` the optimizer is free to shrink or blow up circles while it satisfies `contains`. The first tab keeps only the subset constraints; the second adds the size bound the tutorial introduces, and the layout turns well-behaved.',
  section: 'Tutorial: Predicates & Constraints',
  tags: ['ensure', 'greaterThan', 'contains', 'Circle'],
  docs: ['repo/packages/docs-site/docs/tutorial/predicates.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
