// Fuse.js example: fuse.removeAt() returns the removed item and shifts positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Remove by position',
  summary:
    'fuse.removeAt(2) drops the third song and returns it. Everything after it moves up one place, so a result\'s refIndex for the same song changes. Watch the position numbers and the matches update.',
  section: 'Collections and indexes',
  tags: ['removeAt', 'refIndex', 'dynamic collection', 'search'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md', 'repo/src/core/index.ts', 'repo/src/tools/FuseIndex.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
