// echarts example: Lines on a cartesian grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lines on a cartesian grid',
  summary:
    'A lines series on two value axes instead of a map: 36 arrows from each pupil maths and reading score before a term to after it, coloured by direction, with end symbols and labels on the six biggest moves. Change curveness, line width and where the label sits on the line.',
  section: 'Option: series.lines',
  tags: ['series-lines', 'coordinateSystem cartesian2d', 'data.coords', 'symbol', 'label.position', 'curveness'],
  docs: [
    'repo/en/option/series/lines.md',
    'repo/en/option/partial/coord-sys.md',
    'repo/en/option/partial/line-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
