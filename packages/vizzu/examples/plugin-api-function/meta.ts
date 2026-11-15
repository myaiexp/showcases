// Vizzu example: a plugin api function called from outside as chart.feature.<plugin name>.<function>()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin: API function',
  summary:
    "A plugin's api getter exposes functions that page code calls as chart.feature.<plugin name>.<function>(). Here hasDefaultTitle() tells whether the plugin has replaced the default title, and its answer is printed in the corner after each step.",
  section: 'Writing plugins',
  tags: ['Plugins.PluginApi', 'api', 'feature', 'prepareAnimation'],
  docs: [
    'repo/docs/tutorial/writing_plugins.md',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins.ts',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
