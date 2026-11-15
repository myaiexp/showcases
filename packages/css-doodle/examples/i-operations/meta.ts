// css-doodle example: Operations on @i
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Operations on @i',
  summary:
    'An operation is an operator and a value applied to the index: -1, *2, /3, %4. A trailing operator puts the index on the right, so 2/ is 2 divided by @i; a bare value is added, digits glued to the name are the first argument, and several operations run left to right.',
  section: 'Cell functions',
  tags: ['@i', '@I', 'operations'],
  docs: [
    'pages/css-doodle-com/reference/function-i.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
