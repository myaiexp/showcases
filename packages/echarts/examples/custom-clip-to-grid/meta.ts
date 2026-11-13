// echarts example: Clipping custom shapes to the grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clipping custom shapes to the grid',
  summary:
    'Each data item is a group of a base rect and a pennant polygon. clipRectByRect and clipPointsByRect cut them to the grid rectangle from params.coordSys while a dataZoom window pans. Switch the clipping off to see the shapes spill over the axes.',
  section: 'Option: series.custom',
  tags: ['custom', 'renderItem', 'group', 'children', 'clipRectByRect', 'clipPointsByRect', 'params.coordSys', 'dataZoom', 'filterMode'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/en/option/component/data-zoom-slider.md',
    'repo/en/tutorial/custom-series.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
