// Vizzu example: a chart preset together with a style, in one animate call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset with style',
  summary:
    'A preset only changes the chart config. To change the style or the data in the same step, pass the preset to the config property of the animate() parameter and put the style beside it. Here a column chart becomes a radial bar chart whose axis stripes fade out.',
  section: 'Chart presets',
  tags: ['presets', 'radialBar', 'style', 'config'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/docs/tutorial/chart_presets/03_b.js',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
