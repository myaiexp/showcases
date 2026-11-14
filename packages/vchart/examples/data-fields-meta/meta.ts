// vchart example: Field metadata: sort, domain and alias
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Field metadata: sort, domain and alias',
  summary:
    'The fields option of a data entry describes each dimension: sortIndex and sortReverse order the rows, a linear domain filters out values beyond it, and an alias renames the field in the legend. The full view flips the sort and moves the domain limit.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['data.fields', 'sortIndex', 'sortReverse', 'domain', 'alias', 'type: ordinal', 'type: linear'],
  docs: ['repo/docs/assets/option/en/common/data.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
