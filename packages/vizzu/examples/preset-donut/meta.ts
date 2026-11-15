// Vizzu example: the donut chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: donut',
  summary:
    "Vizzu.presets.donut({ angle, stackedBy }) puts angle and then stackedBy on the x-axis, colours by stackedBy and uses the polar system. It sets only the y range (-200% to 100%), which is what leaves the hole, and no series on y.",
  section: 'Chart presets',
  tags: ['presets', 'donut'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
