// css-doodle/parser: the internal parsers, run on small inputs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The parsers',
  summary:
    'css-doodle/parser exports the parsers css-doodle uses internally, such as parseGrid and the tokenizer. Their output is an internal structure that may change between versions; the example prints what parseGrid makes of 5x4 and 1x1x8, and how the tokenizer splits a call with a unit and ±, and a-1 from a -1.',
  section: 'Package exports',
  tags: ['css-doodle/parser', 'parseGrid', 'tokenizer'],
  docs: ['pages/css-doodle-com/reference/js-api-modules.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
