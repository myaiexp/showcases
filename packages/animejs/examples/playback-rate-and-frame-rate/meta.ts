// animejs example: playbackRate and frameRate
import { defineMeta } from '@/types.ts';

const base = 'pages/animejs-com/documentation/animation/animation-playback-settings/';

export default defineMeta({
  title: 'Animation playbackRate and frameRate',
  summary:
    'Two looping animations: one has its speed changed live through animation.speed, the other its frame rate through animation.fps. Drop the fps low to see steps.',
  section: 'Animation',
  tags: ['animate', 'playbackRate', 'frameRate', 'speed', 'fps', 'utils.sync'],
  docs: [`${base}playbackrate.md`, `${base}framerate.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
