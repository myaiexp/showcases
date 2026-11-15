// Vizzu example: the treemap chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: treemap',
  summary:
    'Vizzu.presets.treemap({ size, color }) puts no series on the axes. It sets size to size and then color, colours and labels by color, so the area of each tile shows its size value.',
  section: 'Chart presets',
  tags: ['presets', 'treemap'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
