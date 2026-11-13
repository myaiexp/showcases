// echarts example: Matrix as a layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Matrix as a layout',
  summary:
    'A headless 3×2 matrix lays out a dashboard: two Cartesian grids span merged cells while a pie and a funnel each fill one cell, all through coordinateSystem: matrix and coord.',
  section: "What's New in 6",
  tags: ['matrix', 'matrix.x.length', 'mergeCells', 'coordinateSystemUsage: box', 'coord'],
  docs: [
    'repo/en/option/component/matrix.md',
    'repo/en/option/partial/matrix-header.md',
    'repo/en/option/partial/matrix-body-corner.md',
    'repo/en/option/partial/coord-sys.md',
    'repo/en/option/series/pie.md',
    'repo/en/option/series/funnel.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
