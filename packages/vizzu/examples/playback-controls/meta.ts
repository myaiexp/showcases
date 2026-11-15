// Vizzu example: AnimControl methods and properties: play, pause, stop, reverse, cancel, seek, speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Playback controls',
  summary:
    'The control object from animate().activated pauses and plays it through playState, flips direction, stops, cancels, seeks and changes speed while an animation runs. The full view puts each on a button or slider; the card replays the grouping change and reverses it 1.5 s into its 4 s.',
  section: 'Animation control & keyframes',
  tags: [
    'animate',
    'activated',
    'AnimControl',
    'playState',
    'direction',
    'speed',
    'seek',
    'position',
    'stop',
    'cancel',
  ],
  docs: [
    'repo/docs/tutorial/animation_control_keyframes.md',
    'repo/docs/tutorial/animation_control_keyframes/01.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/animcontrol.ts',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
