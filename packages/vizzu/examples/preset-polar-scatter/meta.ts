// Vizzu example: the polarScatter chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: polarScatter',
  summary:
    "Vizzu.presets.polarScatter({ angle, radius, dividedBy }) is the scatter preset in the polar coordinate system: angle on x, radius on y, one circle per dividedBy value.",
  section: 'Chart presets',
  tags: ['presets', 'polarScatter'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
