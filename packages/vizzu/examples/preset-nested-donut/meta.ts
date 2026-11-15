// Vizzu example: the nestedDonut chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: nestedDonut',
  summary:
    'Vizzu.presets.nestedDonut({ angle, stackedBy, radius }) is the percentage bar in the polar coordinate system: angle then stackedBy on x with align stretch, so every ring closes, and radius on y with a -50% minimum for the hole.',
  section: 'Chart presets',
  tags: ['presets', 'nestedDonut'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
