// Papa Parse example: edit CSV and watch it become a typed table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CSV to table',
  summary:
    'Edit the CSV and it re-parses on every keystroke. With header: true the first row becomes object keys, and dynamicTyping turns numbers and booleans into real JS values.',
  section: 'Basics',
  tags: ['header', 'dynamicTyping', 'table'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
