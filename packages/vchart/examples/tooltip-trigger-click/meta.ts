// vchart example: Tooltip click trigger, lockAfterClick and hideTimer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip click trigger, lockAfterClick and hideTimer',
  summary:
    'How the tooltip is shown and hidden: hover by default, click with triggerOff click, hover locked by a click with lockAfterClick, or click with triggerOff none and a hideTimer. The card shows and hides tooltips with showTooltip and hideTooltip.',
  section: 'Concepts: Components',
  tags: ['tooltip.trigger', 'triggerOff', 'lockAfterClick', 'hideTimer', 'showTooltip', 'hideTooltip'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Tooltip.md',
    'repo/docs/assets/option/en/component/tooltip.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
