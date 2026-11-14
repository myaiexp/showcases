// marked example: Inline Markdown in short titles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Inline Markdown in short titles',
  summary:
    'A list of short strings (task titles, menu items) with a little bold, italic or code in them, each turned into HTML with marked.parseInline() so no paragraph tags appear.',
  section: 'Inline Markdown',
  tags: ['marked.parseInline', 'titles', 'lists'],
  docs: ['repo/docs/INDEX.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
