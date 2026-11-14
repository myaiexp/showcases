// dexie-js example: A live unread badge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A live unread badge',
  summary:
    'The red bubble on the inbox is a live count of unread messages. Nothing updates it by hand: new mail, opening one message or marking all as read changes the table, and the count follows.',
  section: 'liveQuery',
  tags: ['liveQuery()', 'count()', 'where().equals', 'modify()'],
  docs: [
    'repo/docs/liveQuery().md',
    'repo/docs/Collection/Collection.count().md',
    'repo/docs/Collection/Collection.modify().md',
    'repo/docs/Indexable-Type.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
