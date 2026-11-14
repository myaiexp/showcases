// echarts example: Colour with meaning
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colour with meaning: semantic, convention and intervals',
  summary:
    'The colour guidance in three charts: fruit sales in the fruit own colours (or the default palette), temperatures in blue and red, and a trend line coloured by planned-sales interval with a piecewise visualMap. Switch the chart and the colour scheme.',
  section: 'Best Practices',
  tags: ['bar', 'itemStyle.color', 'visualMap.pieces', 'piecewise', 'color', 'line'],
  docs: [
    'repo/contents/en/best-practices/design/color-enhance.md',
    'repo/en/option/component/visual-map-piecewise.md',
    'repo/en/option/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
