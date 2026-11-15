// AntV Infographic example: Syntax: mixing dotted keys with blocks, last wins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syntax: mixing dotted keys with blocks, last wins',
  summary:
    'Dotted keys can sit inside an indented block, and when the same path is assigned more than once the last assignment wins. The first step mixes a base.shape block with a base.text.fill line; the second assigns the text colour twice.',
  section: 'Infographic syntax',
  tags: ['dotted path', 'theme.base', 'base.shape.stroke', 'last assignment wins'],
  docs: [
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
