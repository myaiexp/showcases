// Vizzu example: chart.feature(plugin, false) switches a registered plugin off, true switches it back on
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin: switch it off',
  summary:
    'feature(plugin, false) disables a registered plugin: its hooks stop running and its listeners are removed, and feature(plugin, true) brings them back. While the title plugin is off, changing the color series leaves the old title in place.',
  section: 'Writing plugins',
  tags: ['feature', 'Plugins.Plugin', 'enable', 'hooks'],
  docs: [
    'repo/docs/tutorial/writing_plugins.md',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins.ts',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
