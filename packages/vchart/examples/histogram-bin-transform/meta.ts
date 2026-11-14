// vchart example: Histogram: the bin transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Histogram: the bin transform',
  summary:
    'From version 2.0.7 a data entry can carry a bin transform that turns raw values into x0, x1 and count rows. A slider changes options.bins and the same 300 raw values regroup.',
  section: 'Bar',
  tags: ['transforms', 'bin', 'options.bins', 'histogram'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Histogram.md',
    'repo/docs/assets/option/en/chart/histogram.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
