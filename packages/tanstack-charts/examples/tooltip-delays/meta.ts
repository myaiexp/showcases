// tanstack-charts example: Show and hide delays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Show and hide delays',
  summary:
    'showDelay postpones the tooltip so brief hovers open nothing, and hideDelay leaves time to come back before it closes. Both are in milliseconds and default to zero. Sweep quickly across the bars with different delays.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.showDelay', 'tooltip.hideDelay'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
