// plotly-js example: Heatmap smoothing and cell gaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Heatmap smoothing and cell gaps',
  summary:
    'A heatmap of a 2D function with zsmooth off, fast or best, and sliders for the gaps between cells.',
  section: 'Heatmaps',
  tags: ['heatmap', 'zsmooth', 'xgap', 'ygap'],
  docs: [
    'repo/_data/plotschema.json',
    'repo/_posts/plotly_js/scientific/contour/2015-08-12-connect-gaps-in-matrix-contour.html',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
