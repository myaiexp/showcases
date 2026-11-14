// dexie-js example: Multi-entry index: find a tag in lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Multi-entry index: find a tag in lists',
  summary:
    'Each friend carries a list of tags, and the index has one entry per tag. Asking for "sports" finds everyone whose list contains it, even though no single field equals "sports".',
  section: 'WhereClause',
  tags: ['version().stores', '*tags', 'where', 'equals', 'toArray'],
  docs: ['repo/docs/MultiEntry-Index.md', 'repo/docs/WhereClause/WhereClause.equals().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
