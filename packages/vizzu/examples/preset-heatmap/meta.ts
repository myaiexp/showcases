// Vizzu example: the heatmap chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: heatmap',
  summary:
    'Vizzu.presets.heatmap({ x, y, lightness }) puts one series on each axis and maps lightness to a measure. With two dimensions on the axes, each cell is a rectangle and its lightness shows the value.',
  section: 'Chart presets',
  tags: ['presets', 'heatmap'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
