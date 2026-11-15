// Vizzu example: control.store() keeps the animation; chart.animate(stored) plays it again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Store an animation and replay it',
  summary:
    'The control from activated has a store() method that returns a reference to the animation itself. Passing that reference to animate() later plays the same animation again, so it need not be described a second time.',
  section: 'Animation control & keyframes',
  tags: ['animate', 'activated', 'AnimControl', 'store', 'CAnimation'],
  docs: [
    'repo/docs/tutorial/animation_control_keyframes.md',
    'repo/docs/tutorial/animation_control_keyframes/01.js',
    'repo/docs/tutorial/animation_control_keyframes/03_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
    'repo/src/apps/weblib/ts-api/animcontrol.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
