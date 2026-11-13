// Dexie.js example: a note-taking list persisted in IndexedDB
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Persistent notes',
  summary:
    'A mini note-taking app backed by IndexedDB. Add notes, delete them, reload the page: they persist.',
  section: 'Basics',
  tags: ['IndexedDB', 'schema', 'orderBy', 'CRUD'],
  docs: [],
  provenance: 'legacy',
  added: '2026-03-03',
});
