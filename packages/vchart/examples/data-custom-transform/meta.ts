// vchart example: A custom DataSet transform in the spec
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom DataSet transform in the spec',
  summary:
    'VChart.registerDataSetTransform adds a transform, here topN, that data.transforms can then name like the built-in fold and filter. A slider sets the N option and the rows are re-ranked and cut before the bars are drawn.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['VChart.registerDataSetTransform', 'data.transforms', 'options', 'Transform'],
  docs: ['repo/docs/assets/api/en/API/vchart.md', 'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Data/Dataset_and_Data_Processing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
