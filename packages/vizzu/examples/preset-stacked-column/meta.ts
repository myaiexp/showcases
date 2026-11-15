// Vizzu example: the stackedColumn chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: stackedColumn',
  summary:
    'Vizzu.presets.stackedColumn({ x, y, stackedBy }) puts x on the x-axis, y and then stackedBy on the y-axis and stackedBy on the colour channel, with y labels. The columns split into stacked pieces.',
  section: 'Chart presets',
  tags: ['presets', 'stackedColumn'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
