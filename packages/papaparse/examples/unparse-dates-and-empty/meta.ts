// Papa Parse example: how Papa.unparse writes Dates, null and undefined
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dates and empty values',
  summary:
    'A real Date is written as ISO text (2026-03-01T09:30:00.000Z). A broken Date, null and undefined all come out as an empty field, so the columns still line up.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'Date', 'null', 'undefined'],
  docs: ['repo/docs/docs.html', 'repo/CHANGELOG.md', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
