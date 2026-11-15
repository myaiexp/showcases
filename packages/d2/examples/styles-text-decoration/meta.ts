// d2 example: Styles: bold, italic, underline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Styles: bold, italic, underline',
  summary:
    '`bold`, `italic` and `underline` are booleans for the label. Shape labels are bold by default and bold wins over italic, so `italic` only shows after `bold: false`.',
  section: 'Styles',
  tags: ['style', 'bold', 'italic', 'underline'],
  docs: ['repo/docs/tour/style.md', 'repo/static/d2/styles-text-decoration.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
