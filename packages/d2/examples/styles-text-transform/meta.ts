// d2 example: Style: text-transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Style: text-transform',
  summary:
    '`text-transform` changes the casing of a label without changing the source text: `uppercase`, `lowercase`, `capitalize`, and `none` to cancel the upper-casing a special theme applies. The docs list `title`, but this D2 build accepts only those four.',
  section: 'Styles',
  tags: ['style', 'text-transform'],
  docs: ['repo/docs/tour/style.md', 'repo/static/d2/styles-text-transform.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
