// Sortable.js example: autoscroll that also moves the scrolling parents
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll nested boxes at once',
  summary:
    'A checklist with its own scrollbar sits inside a scrolling page. Drag a task to the shared bottom edge: with bubbleScroll on, the page scrolls along with the checklist; switch it off to move only the nearest box.',
  section: 'AutoScroll',
  tags: ['bubbleScroll', 'scroll', 'forceAutoScrollFallback', 'option()'],
  docs: ['repo/plugins/AutoScroll/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
