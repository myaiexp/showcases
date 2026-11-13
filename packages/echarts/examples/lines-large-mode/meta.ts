// echarts example: Lines: large mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lines: large mode',
  summary:
    'Thousands of random routes between world cities in a lines series. With large on and the count at or above largeThreshold, the lines are drawn as one batch and the colour of each single line is ignored; turn it off to see the per-line colours. Change the line count, large and largeThreshold.',
  section: 'Option: series.lines',
  tags: ['series-lines', 'large', 'largeThreshold', 'data.lineStyle', 'curveness'],
  docs: [
    'repo/en/option/series/lines.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/partial/line-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
