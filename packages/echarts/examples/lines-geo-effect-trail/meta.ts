// echarts example: Lines: moving effect with trails
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lines: moving effect with trails',
  summary:
    'Routes from one hub drawn by a lines series on a geo map, each with a moving effect symbol (circle, arrow, a hand-drawn plane) that leaves a trail. Change the symbol, trailLength, period or constantSpeed, curveness, the symbols at the line ends and roundTrip.',
  section: 'Option: series.lines',
  tags: ['series-lines', 'effect', 'trailLength', 'period', 'constantSpeed', 'roundTrip', 'curveness', 'symbol', 'zlevel'],
  docs: [
    'repo/en/option/series/lines.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/partial/icon.md',
    'repo/en/api/echarts.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
