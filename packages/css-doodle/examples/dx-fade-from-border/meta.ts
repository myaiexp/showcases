// css-doodle example: Fading in from the border with @db
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fading in from the border with @db',
  summary:
    '@db is the distance to the nearest edge of the grid and is 0 on the border cells. @db(/6) turns it into an opacity that rises from 0 on the edge to 1 in the middle.',
  section: 'Cell functions',
  tags: ['@db', 'opacity'],
  docs: [
    'pages/css-doodle-com/reference/function-dx.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
