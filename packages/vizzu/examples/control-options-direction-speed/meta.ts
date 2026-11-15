// Vizzu example: ControlOptions direction and speed shape playback from the first frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Start a transition reversed or at another speed',
  summary:
    'The same grouping change plays three ways: at speed 0.5 (half as fast), at speed 3, and with direction "reverse", which starts at the new state and plays back toward the old one.',
  section: 'Animation control & keyframes',
  tags: ['animate', 'options', 'speed', 'direction', 'ControlOptions'],
  docs: [
    'repo/docs/tutorial/animation_control_keyframes.md',
    'repo/docs/tutorial/animation_control_keyframes/02_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
    'repo/src/apps/weblib/ts-api/animcontrol.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
