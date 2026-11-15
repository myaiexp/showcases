// Vizzu example: the bar chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: bar',
  summary:
    'Vizzu.presets.bar({ x, y }) is the column turned on its side: the measure x goes on the x-axis, the dimension y on the y-axis, and the labels show x. The chart starts as a column preset.',
  section: 'Chart presets',
  tags: ['presets', 'bar'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
