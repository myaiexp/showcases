// playcanvas example: Starting an anim component by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Starting an anim component by hand',
  summary:
    "With activate on, the anim component plays as soon as it has a clip. With activate off, setting playing to true is not enough: each layer has to be started too, with baseLayer.play(). Three hopping cubes show both; the full view has playing, play and pause buttons for each and prints the flags.",
  section: 'Animation',
  tags: ['AnimComponent', 'activate', 'playing', 'AnimComponentLayer', 'play', 'pause', 'assignAnimation'],
  docs: [
    'repo/docs/user-manual/animation/playing-animations.md',
    'repo/docs/user-manual/editor/scenes/components/anim.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
