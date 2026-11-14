// motion example: Article title that morphs into a heading
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Article title that morphs into a heading',
  summary: 'Tap a story in a list and its small title grows into the big heading of the article page. Turn cropping on and off to see why text wants crop(false): with it, the letters scale cleanly instead of being clipped as the box changes shape.',
  section: 'animateView',
  tags: ['animateView', 'add', 'crop', 'shared element'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
