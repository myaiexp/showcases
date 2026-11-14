// playcanvas example: Switching between clips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Switching between clips',
  summary:
    "Each clip gets a state through assignAnimation, and the base layer switches between them: transition cross-fades over a chosen time, play cuts straight to the start. A box creature idles, walks, runs, waves and jumps (the jump state does not loop and holds its last frame); the layer's state, time and transition flags are printed.",
  section: 'Animation',
  tags: ['AnimComponent', 'AnimComponentLayer', 'assignAnimation', 'transition', 'play', 'activeState', 'activeStateCurrentTime', 'AnimTrack'],
  docs: [
    'repo/docs/user-manual/animation/playing-animations.md',
    'repo/docs/user-manual/animation/clips.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
