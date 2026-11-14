// playcanvas example: Speed, pausing and looping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Speed, pausing and looping',
  summary:
    "Four pendulums play the same clip with different state settings: normal, double speed, a negative state speed that plays it backwards, and loop false so it holds its last frame. The component's speed multiplies every state's, a negative component speed freezes each clip on its first frame, and playing pauses them all.",
  section: 'Animation',
  tags: ['AnimComponent', 'speed', 'playing', 'assignAnimation', 'loop', 'AnimComponentLayer', 'play', 'AnimTrack'],
  docs: ['repo/docs/user-manual/animation/playing-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
