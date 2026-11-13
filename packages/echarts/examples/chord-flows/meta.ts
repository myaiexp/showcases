// echarts example: Chord diagram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chord diagram',
  summary:
    'The chord series new in ECharts 6: flows between seven regions as sectors and ribbons, with edges coloured by source, target or a gradient, and padAngle between sectors.',
  section: "What's New in 6",
  tags: ['series-chord', 'lineStyle.color', 'padAngle', 'minAngle', 'emphasis.focus'],
  docs: [
    'repo/contents/en/basics/release-note/v6-feature.md',
    'repo/en/option/series/chord.md',
    'repo/en/option/partial/circular-layout.md',
    'repo/en/option/partial/emphasis-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
