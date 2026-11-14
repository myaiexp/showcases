// vchart example: Custom legend hover highlight with updateState
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom legend hover highlight with updateState',
  summary:
    'The legend\'s select interaction is turned off and legendItemHover / legendItemUnHover events drive updateState instead: every datum outside the hovered type enters a custom `legend_hover_reverse` state and turns grey. The card runs the same highlight from a timer.',
  section: 'Concepts: Components',
  tags: ['select: false', 'legendItemHover', 'legendItemUnHover', 'updateState', 'stateDef'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Legend.md',
    'repo/docs/assets/api/en/API/vchart.md',
    'repo/docs/assets/api/en/API/event.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
