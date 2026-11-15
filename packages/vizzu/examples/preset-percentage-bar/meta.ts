// Vizzu example: the percentageBar chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: percentageBar',
  summary:
    'Vizzu.presets.percentageBar({ x, stackedBy, y }) is the stacked bar with the x channel aligned to stretch, so every bar fills the full width and its pieces read as percentages.',
  section: 'Chart presets',
  tags: ['presets', 'percentageBar'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
