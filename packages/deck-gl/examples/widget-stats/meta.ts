// deck-gl example: StatsWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'StatsWidget',
  summary:
    'The experimental StatsWidget shows frame rate and counters from deck, luma or the GPU device. Click its header to collapse it; a select swaps the stats type live.',
  section: 'Widgets',
  tags: ['StatsWidget', 'type', 'title', 'initialExpanded', 'framesPerUpdate'],
  docs: [
    'repo/docs/api-reference/widgets/stats-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
