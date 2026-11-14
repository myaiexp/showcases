// Sortable.js example: a plugin that hears drags from lists that did not enable it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Watch lists that never enabled the plugin',
  summary:
    'Two parcel lists with no plugin set up at all, and an activity feed that still reports every pickup and drop. A plugin\'s "Global" events fire for every list, so one plugin can watch the whole page.',
  section: 'Writing plugins',
  tags: ['dragStartGlobal', 'dropGlobal', 'initializeByDefault', 'pluginName', 'group'],
  docs: ['repo/plugins/README.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
