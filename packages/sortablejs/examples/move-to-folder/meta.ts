// Sortable.js example: tick emails and drag them into folders together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Move selected emails into folders',
  summary:
    'Tick a few emails in the inbox and drag one of them into a folder: the whole selection moves in one go. Folders share a group with the inbox, so mail can come back out the same way.',
  section: 'MultiDrag',
  tags: ['multiDrag', 'group', 'selectedClass'],
  docs: ['repo/plugins/MultiDrag/README.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
