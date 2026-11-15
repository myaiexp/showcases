// d2 example: Non-Markdown text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Non-Markdown text',
  summary:
    'Setting `shape: text` removes the outline and the Markdown look. Here a title uses it with `near: top-center` and a large italic `font-size`, above a small flow chart.',
  section: 'Text & Code',
  tags: ['text', 'near', 'font-size'],
  docs: ['repo/docs/tour/text.md', 'repo/static/d2/non-markdown-text.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
