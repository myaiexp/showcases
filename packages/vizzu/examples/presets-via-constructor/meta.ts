// Vizzu example: reaching the presets through a chart instance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Presets via the constructor',
  summary:
    "chart.constructor.presets builds the same presets as Vizzu.presets, so a preset can be called from a chart instance. The docs call them equivalent: they are not the same object (the getter makes a new one on every read), but the same call returns the same config. A bar chart becomes a radial bar chart through the instance.",
  section: 'Chart presets',
  tags: ['presets', 'constructor', 'radialBar'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
