// echarts example: Grid outer bounds and label containment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grid outer bounds and label containment',
  summary:
    'A bar chart with long category labels and a long axis name inside a visible grid box. A dashed frame marks grid.outerBounds; pick outerBoundsMode and outerBoundsContain and slide the inset to see the grid shrink so labels and names stay inside.',
  section: 'Option: Components',
  tags: ['grid', 'outerBounds', 'outerBoundsMode', 'outerBoundsContain', 'containLabel', 'show', 'backgroundColor', 'graphic'],
  docs: [
    'repo/en/option/component/grid.md',
    'repo/en/option/partial/rect-layout-width-height.md',
    'repo/en/option/partial/component-common-style.md',
    'repo/en/option/component/graphic.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
