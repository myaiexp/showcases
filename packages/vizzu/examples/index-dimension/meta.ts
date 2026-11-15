// Vizzu example: a dimension given as a category list plus numeric indexes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dimension as categories and indexes',
  summary:
    'Instead of repeating every string, a dimension can list its categories once and give values as indexes into that list. The first column below is stored as 0, 1, 2, 3, 0, 1, 2, 3 and reads as Pop, Rock, Jazz, Metal twice.',
  section: 'Data',
  tags: ['data', 'categories', 'values', 'IndexDimension'],
  docs: [
    'repo/src/apps/weblib/typeschema-api/data.yaml',
    'repo/docs/tutorial/data.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
