// echarts example: Brush selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Brush selection",
  summary:
    "A brush component with rect, polygon and lineX tools on a scatter series. The brushSelected event gives a live count of selected points.",
  section: 'Option: Components',
  tags: ['brush', 'brushSelected', 'inBrush', 'outOfBrush', 'dispatchAction'],
  docs: ['repo/en/option/component/brush.md', 'repo/en/api/action.md', 'repo/en/api/events.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
