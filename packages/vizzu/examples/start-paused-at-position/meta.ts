// Vizzu example: ControlOptions playState and position start the animation paused half way
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Start paused at a position',
  summary:
    'Animation options can say where an animation starts and whether it runs. With playState "paused" and position 0.5 the chart sits half way between two states, and calling control.play() a moment later lets it finish.',
  section: 'Animation control & keyframes',
  tags: ['animate', 'options', 'playState', 'position', 'AnimControl', 'activated'],
  docs: [
    'repo/docs/tutorial/animation_control_keyframes.md',
    'repo/docs/tutorial/animation_control_keyframes/02_a.js',
    'repo/docs/tutorial/animation_control_keyframes/02_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
    'repo/src/apps/weblib/ts-api/animcontrol.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
