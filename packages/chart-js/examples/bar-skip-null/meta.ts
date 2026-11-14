// Chart.js example: Missing values without gaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Missing values without gaps',
  summary:
    'Three cafés with closed days, so some values are null. With skipNull the empty slots stop shrinking the bars of the cafés that were open.',
  section: 'Chart types',
  tags: ['bar', 'skipNull', 'null', 'grouped'],
  docs: ['repo/docs/charts/bar.md', 'repo/docs/general/data-structures.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
