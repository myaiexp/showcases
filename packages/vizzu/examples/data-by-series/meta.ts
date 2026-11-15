// Vizzu example: a data set written column by column, as series with values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data by series',
  summary:
    'Each series is a column of the spreadsheet: a name, a type (dimension or measure) and its values. The three series here hold twelve records between them, and the chart steps from plain columns to stacked and grouped ones.',
  section: 'Data',
  tags: ['data', 'series', 'values', 'dimension', 'measure'],
  docs: [
    'repo/docs/tutorial/data.md',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
