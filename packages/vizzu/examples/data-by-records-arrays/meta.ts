// Vizzu example: a data set written row by row, each record an array of values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data by records (arrays)',
  summary:
    'Records are the rows of the spreadsheet. The series list names and types the columns once, and each record is an array of values in that order. The chart is the same one as with series, drawn from different input.',
  section: 'Data',
  tags: ['data', 'records', 'series'],
  docs: [
    'repo/docs/tutorial/data.md',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
