// Vizzu example: records written as objects keyed by series name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data by records (objects)',
  summary:
    'A record can also be an object whose keys are series names, so the values do not depend on column order. The series list still declares the types, and the chart behaves exactly as with array records.',
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
