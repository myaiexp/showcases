// Pretext example: paint layoutWithLines() output as SVG text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Paint lines to SVG',
  summary:
    'The same lines layoutWithLines() gives a canvas can be SVG <text> elements, one per line. A thin bar under each line is its measured width.',
  section: 'Manual line layout',
  tags: ['layoutWithLines', 'svg', 'lines', 'width'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
