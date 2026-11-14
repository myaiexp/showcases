// observable-plot example: Sort: county bubbles by radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sort: county bubbles by radius',
  summary:
    'The sort option with channel -r draws the largest counties first so small ones stay visible. Setting it to null uses input order and hides dots under bigger ones.',
  section: 'Transform: Sort',
  tags: ['dot', 'geo', 'geoCentroid', 'sort', 'r'],
  docs: ['repo/docs/transforms/sort.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
