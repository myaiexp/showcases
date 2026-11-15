// Vizzu example: the lollipop chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: lollipop',
  summary:
    'Vizzu.presets.lollipop({ x, y }) sets the same channels as the column preset, with the circle geometry instead of rectangles, so each value is a dot above a thin stem.',
  section: 'Chart presets',
  tags: ['presets', 'lollipop'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
