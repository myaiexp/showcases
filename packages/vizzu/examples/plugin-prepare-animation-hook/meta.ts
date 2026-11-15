// Vizzu example: a plugin whose prepareAnimation hook titles the chart after its color series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin: prepareAnimation hook',
  summary:
    "A plugin class with a hooks getter runs its prepareAnimation function before every animate() call is set up, and may edit the target. This one writes the name of the series on color into the chart title, or a default title when there is none.",
  section: 'Writing plugins',
  tags: ['Plugins.Plugin', 'hooks', 'prepareAnimation', 'feature', 'meta'],
  docs: [
    'repo/docs/tutorial/writing_plugins.md',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins.ts',
    'repo/src/apps/weblib/ts-api/plugins/shorthands.ts',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
