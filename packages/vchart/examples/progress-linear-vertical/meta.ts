// vchart example: Vertical linear progress
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Vertical linear progress",
  summary:
    "direction: 'vertical' stands the bars up, with the category on xField and the value on yField; seriesField colours each tank, bandWidth sets the bar width and leftPadding and rightPadding inset the fill.",
  section: "Gauge, Progress and Liquid",
  tags: ['linearProgress', 'direction', 'seriesField', 'bandWidth', 'progress.leftPadding', 'progress.rightPadding'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Progress.md',
    'repo/docs/assets/option/en/series/linear-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
