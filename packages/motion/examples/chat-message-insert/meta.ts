// motion example: Chat bubbles that push the conversation up
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chat bubbles that push the conversation up',
  summary: 'Send a message and the new bubble appears at the bottom while the older ones slide up to make room, instead of the whole thread jumping. Each bubble carries data-layout, and the insert is wrapped in animateLayout.',
  section: 'animateLayout',
  tags: ['animateLayout', 'data-layout', 'insert'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
