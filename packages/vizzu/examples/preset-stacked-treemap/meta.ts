// Vizzu example: the stackedTreemap chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: stackedTreemap',
  summary:
    'Vizzu.presets.stackedTreemap({ size, dividedBy, color }) sets size to size and then dividedBy, colours by color, labels dividedBy and also maps size to lightness, so the tiles of a group are tinted by their size.',
  section: 'Chart presets',
  tags: ['presets', 'stackedTreemap'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
