// Vizzu example: hook priority, from 0 (last) to 1 (first), decides the order registered plugins run
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin: hook priority',
  summary:
    'A hook function can carry a priority between 0 (last) and 1 (first), and Vizzu runs the registered plugins in that order, not the order they were registered in. Three plugins append their label to the title, so the title spells out the order; changing a priority between steps reorders it.',
  section: 'Writing plugins',
  tags: ['Plugins.PluginHooks', 'priority', 'prepareAnimation', 'feature'],
  docs: [
    'repo/docs/tutorial/writing_plugins.md',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
