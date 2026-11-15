// Vizzu example: the polarColumn chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: polarColumn',
  summary:
    'Vizzu.presets.polarColumn({ angle, radius }) is the column preset in the polar coordinate system: angle takes the x-axis, radius the y-axis, and the radius is labelled.',
  section: 'Chart presets',
  tags: ['presets', 'polarColumn'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
