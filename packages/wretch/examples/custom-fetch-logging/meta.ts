// Wrap fetch to log and time: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wrap fetch to log and time',
  summary:
    'wretch lets you swap in your own fetch. Here a small wrapper writes "Fetching: …" before each request and how long it took afterwards, then hands the real work on. A console pane shows the lines as three different requests go by.',
  section: 'Usage',
  tags: ['fetchPolyfill', 'logging', 'timing'],
  docs: ['repo/README.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
