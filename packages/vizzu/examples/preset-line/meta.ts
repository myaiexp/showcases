// Vizzu example: the line chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: line',
  summary:
    'Vizzu.presets.line({ x, y, dividedBy }) sets x and y and gives every dividedBy value its own colour, with line geometry. Without dividedBy the lines would all merge into one.',
  section: 'Chart presets',
  tags: ['presets', 'line'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
