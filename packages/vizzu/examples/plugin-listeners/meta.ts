// Vizzu example: a plugin's listeners getter connects it to chart events while it is enabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin: listeners',
  summary:
    'A plugin can return event handlers from a listeners getter; Vizzu adds them to the chart when the plugin is enabled. This one counts animation-complete events as the story plays and, in the full view, pointerup events when you click the chart.',
  section: 'Writing plugins',
  tags: ['Plugins.PluginListeners', 'listeners', 'pointerup', 'animation-complete', 'feature'],
  docs: [
    'repo/docs/tutorial/writing_plugins.md',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins.ts',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
