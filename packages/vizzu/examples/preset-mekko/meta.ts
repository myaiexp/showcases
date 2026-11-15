// Vizzu example: the mekko chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: mekko',
  summary:
    'Vizzu.presets.mekko({ x, groupedBy, y, stackedBy }) puts a measure x and then groupedBy on the x-axis, so each column is as wide as its x total, and stacks y by stackedBy on the y-axis. Labels show the x series.',
  section: 'Chart presets',
  tags: ['presets', 'mekko'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
