// Vizzu example: the verticalViolin chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: verticalViolin',
  summary:
    "Vizzu.presets.verticalViolin({ x, splittedBy, y }) puts x and then splittedBy on the x-axis with split on and align center, and draws areas. It is the violin preset turned on its side.",
  section: 'Chart presets',
  tags: ['presets', 'verticalViolin'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
