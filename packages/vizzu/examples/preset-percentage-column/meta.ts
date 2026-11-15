// Vizzu example: the percentageColumn chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: percentageColumn',
  summary:
    'Vizzu.presets.percentageColumn({ x, y, stackedBy }) is the stacked column with the y channel aligned to stretch, so every column fills the full height and the pieces read as percentages of their genre.',
  section: 'Chart presets',
  tags: ['presets', 'percentageColumn'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
