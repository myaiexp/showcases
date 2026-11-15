// Vizzu example: chart.on('click') reports the clicked element, chart.off removes the handler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click event',
  summary:
    'chart.on registers a handler that gets the clicked chart element as event.target, and chart.off takes it away again. The full view prints the element as JSON beside the chart where the docs use alert(); the card only plays the register, remove, register steps because it has no pointer.',
  section: 'Events',
  tags: ['on', 'off', 'click', 'event.target'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/events/01.js',
    'repo/docs/tutorial/events/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
