// Vizzu example: animation-begin and animation-complete handlers log every animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation begin and complete events',
  summary:
    'animation-begin fires when an animation starts running and animation-complete when it ends, so the two bracket every animate() call. The full view logs them with a timestamp; the card counts them in the corner.',
  section: 'Events',
  tags: ['on', 'animation-begin', 'animation-complete'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
