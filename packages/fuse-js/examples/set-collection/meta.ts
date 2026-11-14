// Fuse.js example: setCollection swaps the list without making a new Fuse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Swap the whole list',
  summary:
    'Switch between a city library and a school library. fuse.setCollection() hands the same Fuse object a new list and re-indexes it, so the options and the query you typed stay as they were.',
  section: 'Collections and indexes',
  tags: ['setCollection', 'dynamic collection', 'search', 'keys'],
  docs: ['repo/README.md', 'repo/src/core/index.ts', 'repo/src/tools/FuseIndex.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
