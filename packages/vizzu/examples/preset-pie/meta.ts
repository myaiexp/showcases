// Vizzu example: the pie chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: pie',
  summary:
    'Vizzu.presets.pie({ angle, by }) puts angle and then by on the x-axis, colours by by, labels angle and switches to the polar coordinate system. The start is one stacked bar, which the polar system bends into a pie.',
  section: 'Chart presets',
  tags: ['presets', 'pie'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
