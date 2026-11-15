// Vizzu example: the bubbleplot chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: bubbleplot',
  summary:
    'Vizzu.presets.bubbleplot({ x, y, color, size, dividedBy }) adds a size and a colour channel to the scatter, and labels each circle with its dividedBy value. It starts as the scatter preset.',
  section: 'Chart presets',
  tags: ['presets', 'bubbleplot'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
