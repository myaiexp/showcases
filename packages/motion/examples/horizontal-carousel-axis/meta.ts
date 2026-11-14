// motion example: Photo carousel with scroll dots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Photo carousel with scroll dots',
  summary: 'A swipeable strip of travel photos with the usual dots and a thin bar underneath. By default scroll() watches vertical scroll; axis: "x" points it at the sideways scroll of the strip, driving the bar as an animation and the lit dot from a callback.',
  section: 'scroll',
  tags: ['scroll', 'axis', 'container', 'callback', 'animate'],
  docs: ['pages/motion-dev/docs/scroll.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
