// WAAPI example: the ease parameter compared across anime.js, native and function easings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WAAPI ease replaces easing',
  summary: 'Squares crossing the same distance with waapi.animate() under different ease values: the default out(2), linear, a native WAAPI name, inOut(6), outElastic() and a plain function. Each label shows the value used.',
  section: 'WAAPI',
  tags: ['waapi', 'ease', 'easing', 'outElastic', 'inOut'],
  docs: [
    'pages/animejs-com/documentation/web-animation-api/api-differences-with-native-waapi/easing.md',
    'pages/animejs-com/documentation/web-animation-api/api-differences-with-native-waapi.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
