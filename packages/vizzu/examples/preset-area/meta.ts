// Vizzu example: the area chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: area',
  summary:
    'Vizzu.presets.area({ x, y }) puts x and y on the axes with the area geometry, so the series is one filled shape instead of separate columns. The chart starts as a column preset.',
  section: 'Chart presets',
  tags: ['presets', 'area'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
