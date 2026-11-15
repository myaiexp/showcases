// AntV Infographic example: Syntax: dotted paths against nested blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syntax: dotted paths against nested blocks',
  summary:
    'A deep config path can be written as a dotted key. The first step sets the text colour with theme.base.text.fill on one line, the second writes the same setting as nested blocks, and both draw identically.',
  section: 'Infographic syntax',
  tags: ['dotted path', 'theme.base.text.fill', 'theme', 'base'],
  docs: [
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
