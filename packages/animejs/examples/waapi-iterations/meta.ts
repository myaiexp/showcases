// WAAPI example: the loop parameter versus native iterations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WAAPI loop replaces iterations',
  summary: 'Four squares sweep across with waapi.animate() and loop 0, 2, 4 and true. Each label gives the native iterations value it matches, so loop: 2 sweeps three times.',
  section: 'WAAPI',
  tags: ['waapi', 'loop', 'iterations'],
  docs: [
    'pages/animejs-com/documentation/web-animation-api/api-differences-with-native-waapi/iterations.md',
    'pages/animejs-com/documentation/web-animation-api/api-differences-with-native-waapi.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
