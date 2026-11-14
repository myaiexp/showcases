// vchart example: Legend item styles for unselected and hover states
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend item styles for unselected and hover states',
  summary:
    'Legend item shape, label and background each styled for the normal state and for state.unSelected and the hover states. The card un-checks one series after another with setLegendSelectedDataByIndex so the unSelected styles show.',
  section: 'Concepts: Components',
  tags: ['legends.item', 'shape', 'label', 'background', 'state', 'unSelected', 'selectedHover'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Legend.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
    'repo/docs/assets/option/en/component/legend-common/base-legend.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
