// Vizzu example: the splittedArea chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: splittedArea',
  summary:
    'Vizzu.presets.splittedArea({ x, y, splittedBy }) is the stacked area with split switched on for the y channel: each splittedBy value gets its own area on a shared scale instead of stacking.',
  section: 'Chart presets',
  tags: ['presets', 'splittedArea'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
