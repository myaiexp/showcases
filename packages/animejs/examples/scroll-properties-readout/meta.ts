// Scroll example: reading ScrollObserver instance properties live
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll observer live properties readout',
  summary: 'A table of ScrollObserver properties (progress, isInView, velocity, backward, offsets, distance and the settings) refreshed on every onUpdate while an inner container scrolls; the target is the middle section set with the target setting.',
  section: 'Events',
  tags: ['onScroll', 'onUpdate', 'progress', 'velocity', 'isInView', 'target', 'container'],
  docs: [
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-properties.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-settings.md',
    'pages/animejs-com/documentation/events/onscroll/scrollobserver-settings/target.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
