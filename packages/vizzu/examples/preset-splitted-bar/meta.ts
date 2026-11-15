// Vizzu example: the splittedBar chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: splittedBar',
  summary:
    'Vizzu.presets.splittedBar({ x, splittedBy, y }) is the stacked bar with split switched on for the x channel: the pieces no longer pile up but each splittedBy value gets its own band.',
  section: 'Chart presets',
  tags: ['presets', 'splittedBar'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
