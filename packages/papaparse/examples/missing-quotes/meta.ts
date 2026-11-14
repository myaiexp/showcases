// Papa Parse example: the MissingQuotes error for a quote that is never closed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An unclosed quote swallows the rest',
  summary:
    'The docs call MissingQuotes "probably the worst error you can get": a quote that is opened and never closed makes Papa read everything after it as one cell. Close the quote and every row comes back.',
  section: 'Results',
  tags: ['MissingQuotes', 'Quotes', 'errors', 'quoteChar'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
