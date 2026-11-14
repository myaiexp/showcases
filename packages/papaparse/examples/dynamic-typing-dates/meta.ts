// Papa Parse example: date-times, booleans and blanks under dynamicTyping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dates, booleans and blanks',
  summary:
    'Besides numbers, dynamicTyping converts true/false to booleans, ISO date-times to Date objects and empty values to null. A plain date with no time part is not recognised and stays text.',
  section: 'Parse config',
  tags: ['dynamicTyping', 'Date', 'null', 'ISO 8601'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
