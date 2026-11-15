// AntV Infographic example: Data: the six data shapes as plain objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data: the six data shapes as plain objects',
  summary:
    'The data page lists six built-in data types. Here each one is written as a JavaScript object in options.data (lists, sequences, root, compares, nodes with relations, values) and drawn with a template that reads it; the side panel shows the object.',
  section: 'Data',
  tags: ['data', 'ListData', 'SequenceData', 'HierarchyData', 'CompareData', 'RelationData', 'StatisticsData'],
  docs: [
    'repo/site/src/content/learn/data.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
