// css-doodle example: Characters in brackets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Characters in brackets',
  summary:
    'A bracket expression such as [A-Z] expands to a list of characters, and ranges can be combined as in [0-9a-f] or [A-Z0-9]. The cells each pick one.',
  section: 'Random',
  tags: ['@p', '[range]', '@content'],
  docs: [
    'pages/css-doodle-com/reference/function-p.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
