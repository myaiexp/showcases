// vchart example: Continuous size legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continuous size legend',
  summary:
    'A scatter chart sized by a linear scale with a continuous size legend (type \'size\'), drawn with a sizeBackground wedge. The legend slider range filters the points by size, driven here from code with setLegendSelectedDataByIndex.',
  section: 'Concepts: Components',
  tags: ['legends type \'size\'', 'sizeField', 'sizeBackground', 'handlerText'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Legend.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
    'repo/docs/assets/option/en/component/legend-common/base-legend.md',
    'repo/docs/assets/option/en/component/legend-size.md',
    'repo/docs/assets/option/en/component/legend-common/continuous-legend.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
