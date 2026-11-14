// dexie-js example: Between: ages in a range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Between: ages in a range',
  summary:
    'Pick a start and an end age and the friends in that range light up. By default the start is included and the end is not, so a friend exactly at the end stays dark. A start above the end simply finds nothing.',
  section: 'WhereClause',
  tags: ['where', 'between', 'toArray'],
  docs: ['repo/docs/WhereClause/WhereClause.between().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
