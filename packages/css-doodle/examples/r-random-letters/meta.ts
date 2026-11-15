// css-doodle example: Random letters with @r(a, z)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Random letters with @r(a, z)',
  summary:
    'Two letters give a random letter from the first up to, but not including, the second, so @r(a, z) never returns z. @ri(12, 28) keeps the font size to whole pixels.',
  section: 'Random',
  tags: ['@r', '@ri', '@content', 'letters'],
  docs: [
    'pages/css-doodle-com/reference/function-r.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
