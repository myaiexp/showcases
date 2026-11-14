// vchart example: Legend selectMode: multiple, single, focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend selectMode: multiple, single, focus',
  summary:
    'A four-series line chart whose legend runs in multiple, single or focus selection mode, with allowAllCanceled on or off. A readout shows getLegendSelectedDataByIndex after each legendItemClick; the card rotates the selection with setLegendSelectedDataByIndex.',
  section: 'Concepts: Components',
  tags: ['selectMode', 'allowAllCanceled', 'getLegendSelectedDataByIndex', 'setLegendSelectedDataByIndex', 'legendItemClick'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Legend.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
    'repo/docs/assets/option/en/component/legend-common/base-legend.md',
    'repo/docs/assets/api/en/API/vchart.md',
    'repo/docs/assets/api/en/API/event.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
