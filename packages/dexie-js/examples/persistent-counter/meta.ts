// Dexie.js example: a counter whose value lives in IndexedDB
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Persistent counter',
  summary:
    'A counter stored in IndexedDB as a key-value row. Increment, decrement, reload the page: the value survives.',
  section: 'Getting started',
  tags: ['IndexedDB', 'key-value', 'put', 'get'],
  docs: [],
  provenance: 'legacy',
  added: '2026-03-03',
});
