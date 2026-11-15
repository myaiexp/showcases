// Vizzu example: a pointermove handler prints the marker under the pointer and the pointer position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer move read-out',
  summary:
    'A pointermove handler gets the chart element under the pointer as event.target and the pointer position in event.detail. The full view prints both in a panel as you move; the card has no pointer, so it only keeps the chart moving.',
  section: 'Events',
  tags: ['on', 'pointermove', 'event.target', 'event.detail.position'],
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
