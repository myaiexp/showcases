// Scroll example: onEnter and onLeave callbacks counting threshold crossings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll onEnter and onLeave counters',
  summary: 'A square linked to an inner scroll container, with two counters that go up each time the enter threshold or the leave threshold is met. The container scrolls itself back and forth, so both counters keep climbing.',
  section: 'Events',
  tags: ['onScroll', 'onEnter', 'onLeave', 'enter', 'leave', 'sync'],
  docs: [
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-callbacks/onenter.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-callbacks/onleave.md',
    'pages/animejs-com/documentation/events.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
