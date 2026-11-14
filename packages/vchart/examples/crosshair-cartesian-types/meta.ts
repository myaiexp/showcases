// vchart example: Crosshair line and rect in a Cartesian chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crosshair line and rect in a Cartesian chart',
  summary:
    'crosshair.xField and yField on a line chart, drawn as a band (type rect) or a dashed line (type line). The card walks the crosshair over the categories with setDimensionIndex while the variants rotate.',
  section: 'Concepts: Components',
  tags: ['crosshair', 'xField', 'yField', 'line.type', 'rect', 'setDimensionIndex'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Crosshair.md',
    'repo/docs/assets/option/en/component/crosshair.md',
    'repo/docs/assets/option/en/component/crosshair-common/crosshair-line.md',
    'repo/docs/assets/option/en/component/crosshair-common/crosshair-x-field.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
