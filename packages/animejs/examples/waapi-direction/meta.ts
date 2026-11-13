// WAAPI example: reversed and alternate as the replacement for the native direction option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WAAPI reversed and alternate replace direction',
  summary: 'Four squares run waapi.animate() with each combination of reversed and alternate, matching the four native direction values. The labels give the native equivalent of every lane.',
  section: 'WAAPI',
  tags: ['waapi', 'reversed', 'alternate', 'direction', 'loop'],
  docs: [
    'pages/animejs-com/documentation/web-animation-api/api-differences-with-native-waapi/direction.md',
    'pages/animejs-com/documentation/web-animation-api/api-differences-with-native-waapi.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
