// Vizzu example: the percentageArea chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: percentageArea',
  summary:
    'Vizzu.presets.percentageArea({ x, y, stackedBy }) is the stacked area with the y channel aligned to stretch: the top edge is flat and each band shows its share of the total.',
  section: 'Chart presets',
  tags: ['presets', 'percentageArea'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
