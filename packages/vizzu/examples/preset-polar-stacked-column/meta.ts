// Vizzu example: the polarStackedColumn chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: polarStackedColumn',
  summary:
    "Vizzu.presets.polarStackedColumn({ angle, radius, stackedBy }) is the stacked column preset in the polar coordinate system: angle on x, radius and then stackedBy on y, colour from stackedBy.",
  section: 'Chart presets',
  tags: ['presets', 'polarStackedColumn'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
