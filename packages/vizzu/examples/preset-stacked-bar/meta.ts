// Vizzu example: the stackedBar chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: stackedBar',
  summary:
    'Vizzu.presets.stackedBar({ x, stackedBy, y }) puts the measure x and then stackedBy on the x-axis, so each bar is cut into pieces, and colours by stackedBy. Labels show y.',
  section: 'Chart presets',
  tags: ['presets', 'stackedBar'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
