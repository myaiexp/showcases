// echarts example: Dirty rectangle rendering with a draw counter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dirty rectangle rendering with a draw counter',
  summary:
    'Highlight one point of a 2500-point canvas scatter and count the fill and stroke calls the repaint costs. Re-create the chart with useDirtyRect on or off: with it on, only the changed area is redrawn.',
  section: "What's New in 5",
  tags: ['useDirtyRect', 'echarts.init', 'rendered', 'dispatchAction', 'highlight', 'scatter'],
  docs: [
    'repo/contents/en/basics/release-note/v5-feature.md',
    'repo/en/api/echarts.md',
    'repo/en/api/events.md',
    'repo/en/api/action.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
