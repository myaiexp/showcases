// animejs example: Horizontal scroll triggering a timer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Horizontal scroll triggering a timer",
  summary: "A horizontally scrolling container drives a timer through onScroll with axis x and a target: the timer plays while its tile is in view.",
  section: "Events",
  tags: ['onScroll', 'axis', 'target', 'createTimer'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'pages/animejs-com/documentation/events/onscroll.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-settings/axis.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-settings/target.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-settings/container.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
