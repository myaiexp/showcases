// echarts example: Radar areaStyle, symbols and labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Radar areaStyle, symbols and labels',
  summary:
    'Three polygons on one radar, styled through the series: vertex symbol and size, fill opacity, value labels, dashed lines and emphasis focus. Change each and hover a polygon to fade the rest.',
  section: 'Option: series.radar',
  tags: ['radar', 'areaStyle', 'symbol', 'symbolSize', 'label', 'lineStyle', 'emphasis.focus'],
  docs: [
    'repo/en/option/series/radar.md',
    'repo/en/option/partial/symbol.md',
    'repo/en/option/partial/area-style.md',
    'repo/en/option/partial/label.md',
    'repo/en/option/partial/emphasis-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
