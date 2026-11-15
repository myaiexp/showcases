// Vizzu example: chart presets and the sort option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset with sort',
  summary:
    'A preset resets the channels and most other settings, but legend, title, reverse and sort are the ones you can pass to it. Here radialStackedBar is given sort: byValue and the genres reorder by size; a second preset that does not repeat the sort keeps that order.',
  section: 'Chart presets',
  tags: ['presets', 'radialStackedBar', 'radialBar', 'sort'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/docs/tutorial/chart_presets/02_b.js',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
