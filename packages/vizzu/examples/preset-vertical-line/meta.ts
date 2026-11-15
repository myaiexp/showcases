// Vizzu example: the verticalLine chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: verticalLine',
  summary:
    'Vizzu.presets.verticalLine({ x, y, dividedBy }) has the same configuration as line: x, y, colour from dividedBy and line geometry. It differs only in what you pass, a measure for x and a dimension for y, so the line runs from top to bottom.',
  section: 'Chart presets',
  tags: ['presets', 'verticalLine'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
