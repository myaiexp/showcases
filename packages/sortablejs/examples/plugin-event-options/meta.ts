// Sortable.js example: a plugin that adds a property to every event
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Add a property to every event',
  summary:
    'A menu list whose drop report includes how long you held each dish. Sortable has no such number: a small plugin adds it to the event object, so any callback can read it.',
  section: 'Writing plugins',
  tags: ['eventProperties', 'eventOptions', 'pluginName', 'dragStart', 'nulling', 'onEnd'],
  docs: ['repo/plugins/README.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
