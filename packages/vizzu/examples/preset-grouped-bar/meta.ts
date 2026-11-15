// Vizzu example: the groupedBar chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: groupedBar',
  summary:
    'Vizzu.presets.groupedBar({ x, groupedBy, y }) puts groupedBy and then y on the y-axis, the measure x on the x-axis and colours by y. Each genre becomes a group of bars, one per kind.',
  section: 'Chart presets',
  tags: ['presets', 'groupedBar'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
