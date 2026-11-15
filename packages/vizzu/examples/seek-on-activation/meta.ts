// Vizzu example: animate().activated resolves with a control; seek('50%') jumps ahead
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Seek when the animation starts',
  summary:
    "animate() returns a promise with an activated property that resolves with the animation's control as soon as it starts. Calling seek('50%') on it jumps the animation to half way, so the columns appear half moved and finish from there.",
  section: 'Animation control & keyframes',
  tags: ['animate', 'activated', 'AnimControl', 'seek'],
  docs: [
    'repo/docs/tutorial/animation_control_keyframes.md',
    'repo/docs/tutorial/animation_control_keyframes/01.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
    'repo/src/apps/weblib/ts-api/animcontrol.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
