// echarts example: visualMap piecewise by category
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'visualMap piecewise by category',
  summary:
    'A scatter whose third column is text, mapped to colour and symbol by a piecewise visualMap with categories. Pick selectedMode, orientation, itemSymbol and inverse; the preview hides one category at a time with selectDataRange.',
  section: 'Option: Components',
  tags: ['visualMap', 'piecewise', 'categories', 'dimension', 'inRange', 'selectedMode', 'itemSymbol', 'inverse', 'selectDataRange'],
  docs: [
    'repo/en/option/component/visual-map.md',
    'repo/en/option/component/visual-map-piecewise.md',
    'repo/en/api/action.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
