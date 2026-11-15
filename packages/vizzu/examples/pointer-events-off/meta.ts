// Vizzu example: chart.feature('pointerEvents', false) stops click and pointer events reaching handlers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer events feature',
  summary:
    "The pointerEvents feature forwards the canvas's pointer and wheel events to the chart, and is on by default. With feature('pointerEvents', false) a click handler gets nothing; the full view counts the clicks it receives and has buttons for both states.",
  section: 'Code reference',
  tags: ['feature', 'pointerEvents', 'click', 'on'],
  docs: [
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/vizzu.ts',
    'repo/src/apps/weblib/ts-api/plugins/pointerevents.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
