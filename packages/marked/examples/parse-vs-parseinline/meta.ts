// marked example: parse versus parseInline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'parse versus parseInline',
  summary:
    'One short line of Markdown dropped into a sentence, a button, a heading and a table cell. marked.parse() wraps it in a paragraph, which breaks the sentence and pads the rest; marked.parseInline() returns just the bold and italic parts, so it fits.',
  section: 'Inline Markdown',
  tags: ['marked.parse', 'marked.parseInline', 'inline'],
  docs: ['repo/docs/INDEX.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
