// vchart example: Bar: grouped columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: grouped columns',
  summary:
    'A second entry in xField splits every category into side-by-side columns, one per seriesField value. A select changes how many groups the chart shows.',
  section: 'Bar',
  tags: ['xField', 'seriesField', 'legends'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/chart/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
