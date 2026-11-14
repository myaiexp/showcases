// vchart example: Custom tooltip handler with setTooltipHandler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom tooltip handler with setTooltipHandler',
  summary:
    'The built-in tooltip is replaced by our own DOM card through setTooltipHandler: showTooltip receives the dimension data, draws a title and a bar per series, and positions the card at the pointer; hideTooltip and release complete the handler.',
  section: 'Concepts: Components',
  tags: ['setTooltipHandler', 'ITooltipHandler', 'showTooltip', 'hideTooltip', 'release'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Tooltip.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
