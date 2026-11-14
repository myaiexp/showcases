// Marked: fast Markdown-to-HTML compiler, paired with DOMPurify here
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Marked',
  npm: 'marked',
  tagline: 'A fast, low-level Markdown compiler that turns Markdown into HTML in the browser or on the server.',
  about:
    'Marked turns the plain text people type (# for a heading, ** for bold, - for a list, pipes for a table) into the HTML a browser shows, in one fast pass with no dependencies. Comment boxes, chat apps, wikis, docs sites and note apps all use a converter like it. Every stage is open: a lexer cuts the text into tokens, a parser hands each token to a renderer, and you can override any renderer or tokenizer, walk the token tree, hook in before and after, or add whole new syntax. Marked does not sanitize its output, so these examples pass it through DOMPurify before it reaches the page, as its docs recommend.',
  category: 'Parsing',
  homepage: 'https://marked.js.org',
  docsUrl: 'https://marked.js.org',
  repo: 'https://github.com/markedjs/marked',
  added: '2026-06-14',
  // docs/INDEX.md, then USING_ADVANCED.md, then USING_PRO.md, then broken.md.
  sections: [
    'Usage',
    'Supported Markdown',
    'Marked instance',
    'Options',
    'Inline Markdown',
    'Workers',
    'marked.use()',
    'The pipeline',
    'Renderer',
    'Tokenizer',
    'Walk tokens',
    'Hooks',
    'Custom extensions',
    'Async',
    'Lexer and parser',
    'Markdown is broken',
  ],
});
