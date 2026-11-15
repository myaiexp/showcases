// Vizzu example: the stream chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: stream',
  summary:
    'Vizzu.presets.stream({ x, y, stackedBy }) is the stacked area with the y channel aligned to center: the stack grows evenly up and down from the middle line instead of from the bottom.',
  section: 'Chart presets',
  tags: ['presets', 'stream'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
