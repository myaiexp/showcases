// Vizzu example: the polarLine chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: polarLine',
  summary:
    'Vizzu.presets.polarLine({ angle, radius, dividedBy }) is the line preset in the polar coordinate system: angle on x, radius on y, one line per dividedBy value.',
  section: 'Chart presets',
  tags: ['presets', 'polarLine'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
