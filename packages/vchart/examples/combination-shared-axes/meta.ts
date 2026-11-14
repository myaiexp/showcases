// vchart example: Combination: bar, line and scatter on shared axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Combination: bar, line and scatter on shared axes",
  summary:
    "A common chart whose three series (bar, line, scatter) read one data entry through dataId and share a left and a bottom axis, because no axis is bound to a series with seriesId.",
  section: "Combination",
  tags: ['common','series','dataId','axes','bar','line','scatter'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Combination.md',
    'repo/docs/assets/option/en/chart/common.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
