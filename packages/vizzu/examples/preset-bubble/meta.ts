// Vizzu example: the bubble chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: bubble',
  summary:
    "Vizzu.presets.bubble({ size, color }) puts no series on the axes. It maps size and color, labels by color and draws circles, so the circle area shows the size value.",
  section: 'Chart presets',
  tags: ['presets', 'bubble'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
