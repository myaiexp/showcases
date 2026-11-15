// Vizzu example: the column chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: column',
  summary:
    'Vizzu.presets.column({ x, y }) sets x and y, and a label showing the y value. The chart starts as a bar preset, with the axes the other way round, and the columns stand up when the preset is applied.',
  section: 'Chart presets',
  tags: ['presets', 'column'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
