// Marked: fast Markdown-to-HTML compiler, paired with DOMPurify here
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Marked',
  npm: 'marked',
  tagline: 'A fast, low-level Markdown compiler that turns Markdown into HTML in the browser or on the server.',
  about:
    'Marked parses GitHub-Flavored Markdown (tables, task lists, strikethrough, fenced code) in a single fast pass, with no dependencies. It is the quickest way to add a live preview or render user content. But Marked deliberately does not sanitize its output: any raw HTML in the source passes straight through. That is why it pairs naturally with DOMPurify. Marked turns Markdown into HTML, DOMPurify makes that HTML safe to insert into the page.',
  category: 'Parsing',
  homepage: 'https://marked.js.org',
  docsUrl: 'https://marked.js.org',
  repo: 'https://github.com/markedjs/marked',
  added: '2026-06-14',
  sections: ['Basics'],
});
