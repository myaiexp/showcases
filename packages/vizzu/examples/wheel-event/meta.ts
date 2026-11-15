// Vizzu example: a wheel handler receives the scroll delta over the chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wheel event',
  summary:
    'The wheel event reports event.detail.delta, the amount scrolled, for a wheel turned over the chart. The full view prints each delta and a running total; the card has no wheel, so it keeps the chart moving and says so.',
  section: 'Events',
  tags: ['on', 'wheel', 'detail.delta'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
    'repo/src/apps/weblib/ts-api/plugins/pointerevents.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
