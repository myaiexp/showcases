// Papa Parse example: __parsed_extra for rows with more fields than the header
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extra values go to __parsed_extra',
  summary:
    'When a row has more values than the header has names, Papa keeps the surplus: it collects them in a list under the key __parsed_extra and adds a TooManyFields error, so nothing is silently dropped.',
  section: 'Results',
  tags: ['__parsed_extra', 'TooManyFields', 'FieldMismatch', 'header', 'errors'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
