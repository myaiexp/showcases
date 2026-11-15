// Vizzu example: the verticalStream chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: verticalStream',
  summary:
    'Vizzu.presets.verticalStream({ x, stackedBy, y }) stacks x by stackedBy on the x-axis, centres the stack on the middle of the axis (align center) and draws it as an area, so it flows from top to bottom. It is the stream preset turned on its side.',
  section: 'Chart presets',
  tags: ['presets', 'verticalStream'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
