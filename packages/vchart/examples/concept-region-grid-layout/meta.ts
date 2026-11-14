// vchart example: Two regions on a grid layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two regions on a grid layout',
  summary:
    'A pie series and a bar series live in separate regions, placed by layout type grid with each model id given a column, row and span. The full view widens the pie region and the grid re-flows.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['region', 'layout.type grid', 'modelId', 'colSpan', 'regionId'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Understanding_VChart.md', 'repo/docs/assets/option/en/common/layout.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
