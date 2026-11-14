// vchart example: markLine type-step between two points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'markLine type-step between two points',
  summary:
    'A stepped connector between two data points: markLine type \'type-step\' with coordinates, connectDirection and expandDistance, plus a label and start and end symbols.',
  section: 'Concepts: Components',
  tags: ['markLine', 'type-step', 'connectDirection', 'expandDistance', 'coordinates', 'startSymbol', 'endSymbol'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/marker.md',
    'repo/docs/assets/option/en/component/mark-line.md',
    'repo/docs/assets/option/en/component/marker-common/marker-data-point.md',
    'repo/docs/assets/option/en/component/marker-common/marker-symbol.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
