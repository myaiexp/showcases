// vchart example: A derived data entry with fromDataId and filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A derived data entry with fromDataId and filter',
  summary:
    'A second data entry reads the first through fromDataId and drops rows with empty scores using a filter transform. The series draws either entry; the missing Wednesday row leaves a gap in one and disappears from the other.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['data.fromDataId', 'fromDataIndex', 'transforms', 'fold', 'filter', 'dataId'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Data/Data_Types_and_Interface.md', 'repo/docs/assets/option/en/common/data.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
