// Animation example: autoplay true against autoplay false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation autoplay true and false',
  summary: 'Two identical animations side by side: the autoplay: true one starts on its own, the autoplay: false one stays put until play() is called. The full view shows each animation\'s paused and progress values.',
  section: 'Animation',
  tags: ['animate', 'autoplay', 'play', 'paused'],
  docs: [
    'pages/animejs-com/documentation/animation/animation-playback-settings/autoplay.md',
    'pages/animejs-com/documentation/animation/animation-playback-settings.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
