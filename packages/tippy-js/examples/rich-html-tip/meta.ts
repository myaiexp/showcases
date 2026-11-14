// Tippy.js example: product tips written as HTML strings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rich content from HTML',
  summary:
    'A tip does not have to be plain text. Hover a product and its tip shows a bold price, a star rating and a green "In stock" line, all written as a small piece of HTML.',
  section: 'HTML content',
  tags: ['content: string', 'content()', 'allowHTML', 'placement'],
  docs: ['repo/website/src/pages/v6/html-content.mdx', 'repo/website/src/pages/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
