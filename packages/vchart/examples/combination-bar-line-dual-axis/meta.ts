// vchart example: Combination: bars and a line on two value axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Combination: bars and a line on two value axes",
  summary:
    "A common chart with a bar series and a line series reading different data entries through dataIndex. The axes bind to them with seriesIndex and seriesId, so the bars use the left axis and the line the right one. Values refresh every two seconds.",
  section: "Combination",
  tags: ['common','series','dataIndex','axes','seriesIndex','seriesId'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Combination.md',
    'repo/docs/assets/option/en/chart/common.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
