// Pretext example: set text inside a shape with one layoutNextLine call per row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text in a shape',
  summary:
    'A shape supplies a width for every row; layoutNextLine fills that row and returns where it stopped, and the line is centred by its own measured width. Pick a diamond, circle or heart.',
  section: 'Manual line layout',
  tags: ['layoutNextLine', 'cursor', 'shape', 'centering'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
