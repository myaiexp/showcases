// Tone.js example: Play a phrase at half or double speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play a phrase at half or double speed',
  summary:
    'playbackRate scales how fast an event or Part moves through its own timeline, without touching the Transport\'s tempo. The same four notes run at 0.5x, 1x and 2x; drag the rate in the full view to speed one part up while everything else holds still.',
  section: 'Events',
  tags: ['Part', 'playbackRate', 'loop'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Part.ts',
    'repo/Tone/event/ToneEvent.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
