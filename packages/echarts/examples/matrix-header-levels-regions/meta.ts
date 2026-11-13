// echarts example: Matrix header levels, sizes and cell regions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Matrix header levels, sizes and cell regions',
  summary:
    'A two-week timetable built from a matrix alone: a two-level column header, per-level row heights, a column with its own size, a styled divider line, and body regions that merge cells and carry their own colour. Resize the levels or turn merging off.',
  section: 'Option: Components',
  tags: ['matrix', 'x.data', 'levels', 'levelSize', 'size', 'dividerLineStyle', 'body.data', 'coord', 'mergeCells', 'corner'],
  docs: [
    'repo/en/option/component/matrix.md',
    'repo/en/option/partial/matrix-header.md',
    'repo/en/option/partial/matrix-body-corner.md',
    'repo/en/option/partial/matrix-region.md',
    'repo/en/option/partial/rect-layout.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
