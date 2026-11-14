// vchart example: Waterfall: totals from a data field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waterfall: totals from a data field',
  summary:
    'total.type \'field\' treats the rows whose tagField is true as totals. collectCountField says how many preceding rows each total sums, so quarterly sub-totals and a final total sit in one dataset.',
  section: 'Bar',
  tags: ['total.type', 'total.tagField', 'total.collectCountField', 'seriesField'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Waterfall.md',
    'repo/docs/assets/option/en/series/waterfall.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
