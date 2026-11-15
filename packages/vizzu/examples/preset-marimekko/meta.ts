// Vizzu example: the marimekko chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: marimekko',
  summary:
    'Vizzu.presets.marimekko({ x, groupedBy, y, stackedBy }) is the mekko with the y channel aligned to stretch: the columns keep their widths but all reach the top, so the heights show the share of each channel.',
  section: 'Chart presets',
  tags: ['presets', 'marimekko'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
