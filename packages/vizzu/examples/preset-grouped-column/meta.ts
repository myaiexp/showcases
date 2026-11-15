// Vizzu example: the groupedColumn chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: groupedColumn',
  summary:
    'Vizzu.presets.groupedColumn({ groupedBy, x, y }) puts groupedBy and then x on the x-axis, y on the y-axis, labels the y value and colours by x. Each genre becomes a group and its kinds sit side by side in it.',
  section: 'Chart presets',
  tags: ['presets', 'groupedColumn'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
