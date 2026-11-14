// Fuse.js example: key weights reorder help articles for the same query
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Titles count more than small print',
  summary:
    'Give each field a weight and Fuse.js ranks by it. Search "refund" in a help centre: with the title weighted up, the page named Refund policy wins; weight the body instead and the pages that merely mention refunds jump ahead.',
  section: 'Keys and results',
  tags: ['keys', 'weight', 'ignoreLocation', 'includeScore', 'includeMatches'],
  docs: ['repo/README.md', 'repo/src/types.ts', 'repo/docs/fuzzy-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
