// WAAPI example: then() as the replacement for the native finished promise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WAAPI then() replaces finished',
  summary: 'A circle plays three alternating passes with waapi.animate(). A readout flips from pending to fulfilled when the promise returned by then() resolves; Replay starts a new run.',
  section: 'WAAPI',
  tags: ['waapi', 'then', 'finished', 'Promise', 'loop'],
  docs: [
    'pages/animejs-com/documentation/web-animation-api/api-differences-with-native-waapi/finished.md',
    'pages/animejs-com/documentation/web-animation-api/api-differences-with-native-waapi.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
