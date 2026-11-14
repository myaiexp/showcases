// playcanvas example: Animation events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation events',
  summary:
    "An AnimEvents list on a clip fires named events as playback passes their times. A walking loop fires a footstep with a foot property twice per cycle, and each one leaves a fading footprint under that foot; an event at the end of the non-looping jump fires landed, which sends a ring across the floor and walks on. The log prints each event.",
  section: 'Animation',
  tags: ['AnimEvents', 'AnimTrack', 'events', 'AnimComponent', 'on', 'footstep', 'transition', 'assignAnimation'],
  docs: [
    'repo/docs/user-manual/animation/events.md',
    'repo/docs/user-manual/animation/playing-animations.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
