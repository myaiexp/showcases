// Vizzu example: the waterfall chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: waterfall',
  summary:
    'Vizzu.presets.waterfall({ x, y }) puts x on the x-axis, y and then x on the y-axis, labels the y value and colours by y. Each bar floats on top of the running total of the bars before it, and the colour follows the size of the change.',
  section: 'Chart presets',
  tags: ['presets', 'waterfall'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
