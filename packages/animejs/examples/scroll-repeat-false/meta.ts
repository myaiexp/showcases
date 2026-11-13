// animejs example: ScrollObserver repeat on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ScrollObserver repeat on and off",
  summary: "Two timers linked to scroll observers that differ only in repeat. With repeat false the observer reverts after its first run, so its counter stops.",
  section: "Events",
  tags: ['onScroll', 'repeat', 'createTimer', 'onUpdate'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-settings/repeat.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-settings/target.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-settings/container.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-settings/debug.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
