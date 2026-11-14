// marked example: See the token tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'See the token tree',
  summary:
    'Before Marked writes any HTML, its lexer cuts the text into tokens: a blockquote holding a paragraph holding text and strong. marked.lexer() returns that tree, drawn here as nested boxes that grow as you type.',
  section: 'Lexer and parser',
  tags: ['marked.lexer', 'tokens'],
  docs: ['repo/docs/USING_PRO.md', 'repo/src/Tokens.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
