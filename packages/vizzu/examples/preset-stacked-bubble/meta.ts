// Vizzu example: the stackedBubble chart preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preset: stackedBubble',
  summary:
    "Vizzu.presets.stackedBubble({ size, stackedBy, color }) maps size to size and then stackedBy and colour to color, with circle geometry and no axes. Each color value becomes a cluster of one bubble per stackedBy value.",
  section: 'Chart presets',
  tags: ['presets', 'stackedBubble'],
  docs: [
    'repo/docs/tutorial/chart_presets.md',
    'repo/src/apps/weblib/ts-api/plugins/presets.ts',
    'repo/src/apps/weblib/ts-api/plugins/presetconfigs.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
