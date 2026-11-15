// Vizzu example: the radialBar chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: radialBar',
  summary:
    "Vizzu.presets.radialBar({ angle, radius }) is the bar preset in the polar coordinate system, with the y-axis range starting at -50% so the rings leave a hole in the middle. Angle labels each ring.",
  section: 'Chart presets',
  tags: ['presets', 'radialBar'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
