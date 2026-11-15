// Vizzu example: the splittedColumn chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: splittedColumn',
  summary:
    'Vizzu.presets.splittedColumn({ x, y, splittedBy }) is the stacked column with split switched on for the y channel: the pieces no longer pile up but each splittedBy value gets its own band. It starts as the stacked column.',
  section: 'Chart presets',
  tags: ['presets', 'splittedColumn'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
