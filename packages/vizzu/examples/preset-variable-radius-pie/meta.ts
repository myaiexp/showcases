// Vizzu example: the variableRadiusPie chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: variableRadiusPie',
  summary:
    "Vizzu.presets.variableRadiusPie({ angle, by, radius }) puts angle and then by on the x-axis and radius on the y-axis, colours by by, labels radius and uses the polar system. Slice width is one measure and slice length another.",
  section: 'Chart presets',
  tags: ['presets', 'variableRadiusPie'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
