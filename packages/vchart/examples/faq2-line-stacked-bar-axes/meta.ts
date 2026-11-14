// vchart example: FAQ: lines and stacked bars on chosen axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: lines and stacked bars on chosen axes",
  summary:
    "A common chart with a stacked bar series and two lines. Each axis lists its series in seriesId, so the Rate line can follow the left or the right axis; the card flips it on a timer.",
  section: 'FAQ',
  tags: ['common','stack','axes.seriesId','dataId','dual axis'],
  docs: [
    'repo/docs/assets/faq/en/109-How to implement a combination of line chart and stacked bar chart.md',
    'repo/docs/assets/faq/en/162-How to define the mapping relationship of the axes for the combination of line chart and stacked column chart.md',
    'repo/docs/assets/faq/en/168-How do I set up some lines to follow the left axis, while the others follow the right axis in a line chart.md',
    'repo/docs/assets/faq/en/190- How to draw a dual-axis chart.md',
    'repo/docs/assets/option/en/component/axis-common/base-axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
