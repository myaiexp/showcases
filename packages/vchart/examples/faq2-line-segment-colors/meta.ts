// vchart example: FAQ: different colours on one line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: different colours on one line",
  summary:
    "line.style.stroke and lineDash accept callbacks on the datum, so the last points of a series (a forecast) are drawn red and dashed. A segment takes the style of the point it ends on.",
  section: 'FAQ',
  tags: ['line.style.stroke','lineDash','callback','datum'],
  docs: [
    'repo/docs/assets/faq/en/130-How to configure the colors of different line segments in a line chart.md',
    'repo/docs/assets/faq/en/156- How to assign different colors to multiple lines in a line chart.md',
    'repo/docs/assets/faq/en/182- How to assign different colors to a line in VChart.md',
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
