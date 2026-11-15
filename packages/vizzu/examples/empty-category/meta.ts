// Vizzu example: '' as a dimension value is a category without a name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nameless category',
  summary:
    'A missing dimension value is written as an empty string, which gives a category with no name (the third column here has no label). A missing measure is written as 0, so a combination with no data stays on the chart as an empty slot.',
  section: 'Data',
  tags: ['data', 'dimension', 'empty string'],
  docs: [
    'repo/docs/tutorial/data.md',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
