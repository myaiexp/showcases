// css-doodle example: Dice with @ri(1, 6)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dice with @ri(1, 6)',
  summary:
    '@ri(1, 6) rounds a random number to the nearest integer, so the cells show dice rolls from 1 to 6. The bounds can come out too, but each is only half as likely as the whole numbers between them.',
  section: 'Random',
  tags: ['@ri', '@content'],
  docs: [
    'pages/css-doodle-com/reference/function-r.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
