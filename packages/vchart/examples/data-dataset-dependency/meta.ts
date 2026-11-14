// vchart example: DataView chains that update themselves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DataView chains that update themselves',
  summary:
    'Two CSV DataViews feed a merged DataView, which feeds an average DataView, all in one DataSet shared with the chart. Calling parseNewData on either source makes the dependent views and the bar and line series follow without touching the chart.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['DataSet', 'DataView', 'parse', 'parseNewData', 'transform', 'registerTransform', 'dataview parser', 'dataSet init option'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Data/Dataset_and_Data_Processing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
