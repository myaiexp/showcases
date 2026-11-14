// vchart example: A bar and a line series with their own data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A bar and a line series with their own data',
  summary:
    'A combined chart gives each series its own data entry through dataId: a grouped bar series on one entry and a line of averages on another. Each entry refreshes separately with updateData.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['series', 'dataId', 'updateData', 'seriesField', 'type: common'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Composition_and_Effect_of_Series.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
