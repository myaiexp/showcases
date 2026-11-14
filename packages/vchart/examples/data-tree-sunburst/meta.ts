// vchart example: Tree-structured data in a sunburst
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tree-structured data in a sunburst',
  summary:
    'Hierarchical charts read nested data: each node has a name, an optional value and children. A sunburst maps it with categoryField and valueField, and drill lets the reader click into a branch. The card re-rolls the leaf values with updateData.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['sunburst', 'tree data', 'children', 'drill', 'categoryField', 'valueField', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Data/Data_Types_and_Interface.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
