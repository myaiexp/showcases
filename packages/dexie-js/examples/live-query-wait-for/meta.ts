// dexie-js example: A live fingerprint with Dexie.waitFor()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A live fingerprint with Dexie.waitFor()',
  summary:
    'The coloured tiles are a fingerprint (a SHA-1 hash) of everything in the table, recomputed live. Change Per\'s age and the picture changes; change it back and the very same picture returns. The hash comes from the browser\'s crypto API, which a live query may only wait for through Dexie.waitFor().',
  section: 'liveQuery',
  tags: ['liveQuery()', 'Dexie.waitFor()', 'crypto.subtle', 'modify()'],
  docs: ['repo/docs/liveQuery().md', 'repo/docs/Dexie/Dexie.waitFor().md', 'repo/docs/Collection/Collection.modify().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
