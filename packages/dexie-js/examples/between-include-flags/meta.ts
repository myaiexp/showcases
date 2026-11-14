// dexie-js example: Between with includeLower and includeUpper
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Between with includeLower and includeUpper',
  summary:
    'The two optional flags decide whether a friend exactly at the start or the end of the range counts. Tick the boxes (or press the presets) and watch Bertil at 18 and Sara at 50 switch on and off.',
  section: 'WhereClause',
  tags: ['where', 'between', 'includeLower', 'includeUpper', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.between().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
