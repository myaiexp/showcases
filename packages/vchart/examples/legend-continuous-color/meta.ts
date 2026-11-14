// vchart example: Continuous color legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continuous color legend',
  summary:
    'A heatmap coloured by a linear color scale with a continuous color legend (type \'color\'): rail, handle text, start and end text. The legend range is set from code with setLegendSelectedDataByIndex, and cells outside it are filtered out.',
  section: 'Concepts: Components',
  tags: ['legends type \'color\'', 'field', 'handlerText', 'startText', 'endText', 'defaultSelected'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Legend.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
    'repo/docs/assets/option/en/component/legend-common/base-legend.md',
    'repo/docs/assets/option/en/component/legend-color.md',
    'repo/docs/assets/option/en/component/legend-common/continuous-legend.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
