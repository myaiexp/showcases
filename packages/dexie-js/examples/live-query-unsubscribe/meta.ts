// dexie-js example: Unsubscribe stops the updates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unsubscribe stops the updates',
  summary:
    'Two parts of a page follow the same live top-3 scoreboard. Once B unsubscribes, as a screen does when it closes, new scores still reach A but B stays frozen at what it last saw.',
  section: 'liveQuery',
  tags: ['liveQuery()', 'subscribe', 'unsubscribe', 'orderBy().reverse().limit()'],
  docs: [
    'repo/docs/liveQuery().md',
    'repo/docs/Table/Table.orderBy().md',
    'repo/docs/Collection/Collection.reverse().md',
    'repo/docs/Collection/Collection.limit().md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
