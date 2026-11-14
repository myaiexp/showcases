// marked example: Render Markdown already on the page
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render Markdown already on the page',
  summary:
    'The Markdown for a page sits in a hidden textarea; one line of script reads it and fills a content div with the formatted result. Press Run to watch the empty page fill in. This is how the docs suggest rendering on-page content in a browser.',
  section: 'Usage',
  tags: ['marked.parse', 'textarea', 'innerHTML', 'browser'],
  docs: ['repo/docs/INDEX.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
