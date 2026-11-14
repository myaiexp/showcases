// vchart example: Flat data and the fold transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flat data and the fold transform',
  summary:
    'One row per bar is the shape VChart wants. Wide rows with a column per class are flattened by a fold transform on the data entry, giving the same grouped bars; the readout shows the rows the series actually reads from getDataSet.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['data.transforms', 'fold', 'key', 'value', 'fields', 'getDataSet', 'latestData'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Data/Data_Types_and_Interface.md', 'repo/docs/assets/option/en/common/data.md', 'repo/docs/assets/api/en/API/vchart.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
