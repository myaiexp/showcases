// dexie-js example: StartsWithAnyOf: several prefixes at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'StartsWithAnyOf: several prefixes at once',
  summary:
    'Type several prefixes separated by commas and every name starting with any of them lights up, such as "Sa, Pe". Case matters here.',
  section: 'WhereClause',
  tags: ['where', 'startsWithAnyOf', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.startsWithAnyOf().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
