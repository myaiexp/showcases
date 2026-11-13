// echarts example: Lines: polyline tracks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lines: polyline tracks',
  summary:
    'Five hand-placed ferry tracks across the Baltic Sea as a lines series: with polyline on, data.coords can hold any number of waypoints; switch it off and each track shrinks to a straight line between its ends. Per-item colours, line width and type, and a moving effect are adjustable.',
  section: 'Option: series.lines',
  tags: ['series-lines', 'polyline', 'data.coords', 'data.lineStyle', 'effect', 'boundingCoords', 'aspectScale'],
  docs: [
    'repo/en/option/series/lines.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/partial/line-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
