// css-doodle example: The ± shorthand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The ± shorthand',
  summary:
    '@r(±25deg) is a symmetric range, the same as @r(-25deg, 25deg). Here each square is jittered by @r(±20%) in both directions and tilted by @r(±25deg).',
  section: 'Random',
  tags: ['@r', '±', 'translate', 'rotate'],
  docs: [
    'pages/css-doodle-com/reference/function-r.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
