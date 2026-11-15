// Vizzu example: the stackedArea chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: stackedArea',
  summary:
    'Vizzu.presets.stackedArea({ x, y, stackedBy }) returns a chart config: the x series along the bottom, y stacked by stackedBy on the y-axis and on the colour channel, with area geometry. The chart starts as a column preset and animates into the stacked area.',
  section: 'Chart presets',
  tags: ['presets', 'stackedArea', 'area', 'stackedBy'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
