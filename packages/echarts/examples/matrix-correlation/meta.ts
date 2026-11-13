// echarts example: Correlation matrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Correlation matrix',
  summary:
    'A heatmap on the matrix coordinate system: six variables under two-level Weather / Sales headers, each body cell coloured and labelled with a Pearson correlation.',
  section: "What's New in 6",
  tags: ['matrix', 'matrix.x.data', 'coordinateSystem: matrix', 'heatmap', 'visualMap'],
  docs: [
    'repo/contents/en/basics/release-note/v6-feature.md',
    'repo/en/option/component/matrix.md',
    'repo/en/option/partial/matrix-header.md',
    'repo/en/option/partial/matrix-body-corner.md',
    'repo/en/option/partial/coord-sys.md',
    'repo/en/option/series/heatmap.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
