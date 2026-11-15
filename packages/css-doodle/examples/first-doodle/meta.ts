// The getting-started doodle: @grid, @pn and plain CSS in three lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your first doodle',
  summary:
    'The three lines from the getting-started guide: @grid makes a 7 × 7 grid on a dark background, @pn hands each cell the next corner shape in its list so neighbouring leaves face opposite ways, and background: #fff is ordinary CSS applied to every cell.',
  section: 'Getting started',
  tags: ['<css-doodle>', '@grid', '@pn', 'border-radius'],
  docs: ['pages/css-doodle-com/getting-started.md', 'pages/css-doodle-com/reference/function-pn.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
