// dexie-js example: liveQuery: the docs' deep dive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "liveQuery: the docs' deep dive",
  summary:
    'A live query asks for friends aged 50 to 75 and is sent a fresh answer whenever a change could alter it. Magdalena is added, aged, made younger, given an extra property and deleted; the log on the right is every answer the subscriber receives, with nobody asking again.',
  section: 'liveQuery',
  tags: ['liveQuery()', 'subscribe', 'unsubscribe', 'where().between'],
  docs: ['repo/docs/liveQuery().md', 'repo/docs/Table/Table.update().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
