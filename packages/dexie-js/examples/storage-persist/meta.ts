// dexie-js example: Ask the browser to keep the data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ask the browser to keep the data',
  summary:
    'By default a browser treats a site\'s database as "best-effort" and may delete it when the device runs low on space. An offline music app would lose its downloads, so it can ask for persistent storage. The card shows the current status; the full view has the button that asks.',
  section: 'Knowledge base',
  tags: ['StorageManager', 'navigator.storage.persist()', 'navigator.storage.persisted()'],
  docs: ['repo/docs/StorageManager.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
