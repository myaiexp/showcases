// Papa Parse example: the three parts of a parse result
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What a parse result holds',
  summary:
    'Every parse hands back one object with three parts: data (the rows), errors (a list of what looked wrong, with the row) and meta (the delimiter and line break Papa used, the column names, whether it stopped early).',
  section: 'Results',
  tags: ['ParseResult', 'data', 'errors', 'meta', 'fields', 'delimiter', 'linebreak', 'aborted', 'truncated'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
