// Sortable.js example: writing and mounting a tiny plugin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Write a plugin that counts moves',
  summary:
    'A chore wall with a plugin written from scratch: every time a chore is moved, a small badge counts it and a total goes up. A second list without the option shows the plugin staying out of the way.',
  section: 'Writing plugins',
  tags: ['Sortable.mount', 'pluginName', 'defaults', 'dragStart', 'drop', 'initializeByDefault'],
  docs: ['repo/plugins/README.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
