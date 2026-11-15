// Vizzu example: series without a type: the first value decides
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Series type inference',
  summary:
    'None of the series here has a type. Vizzu looks at typeof the first value: a string makes a dimension, a number makes a measure. The full view lists the types it picked.',
  section: 'Data',
  tags: ['data', 'type', 'dimension', 'measure'],
  docs: [
    'repo/docs/tutorial/data.md',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
