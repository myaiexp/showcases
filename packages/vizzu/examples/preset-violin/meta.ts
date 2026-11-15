// Vizzu example: the violin chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: violin',
  summary:
    "Vizzu.presets.violin({ x, y, splittedBy }) puts y and then splittedBy on the y-axis with split on and align center, and draws areas. Each splittedBy series gets its own band and is mirrored around the middle of that band.",
  section: 'Chart presets',
  tags: ['presets', 'violin'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
