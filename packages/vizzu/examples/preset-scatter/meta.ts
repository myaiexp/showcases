// Vizzu example: the scatter chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: scatter',
  summary:
    'Vizzu.presets.scatter({ x, y, dividedBy }) puts two measures on the axes and uses dividedBy on the noop channel, which gives each of its values its own circle. The columns turn into dots.',
  section: 'Chart presets',
  tags: ['presets', 'scatter'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
