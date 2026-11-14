// dexie-js example: How much space the database uses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How much space the database uses',
  summary:
    'An app can store real files, such as photos, as blobs. Each 1 MB photo added here pushes the browser\'s storage estimate up, and deleting them brings it back down. The quota is how much the browser would let this site keep, which an app can show its users before they run out.',
  section: 'Knowledge base',
  tags: ['StorageManager', 'navigator.storage.estimate()', 'Blob', 'clear()'],
  docs: ['repo/docs/StorageManager.md', 'repo/docs/API-Reference.md', 'repo/docs/Table/Table.clear().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
