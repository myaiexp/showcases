// Vizzu example: the radialStackedBar chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: radialStackedBar',
  summary:
    'Vizzu.presets.radialStackedBar({ angle, stackedBy, radius }) is the stacked bar preset in the polar coordinate system: angle then stackedBy on x, radius on y with the range starting at -50% for a hole in the middle.',
  section: 'Chart presets',
  tags: ['presets', 'radialStackedBar'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
