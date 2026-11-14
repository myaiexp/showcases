// motion example: One dimmer for every lamp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One dimmer for every lamp',
  summary: 'A smart-home panel where a single brightness value lights four lamps and fills a level bar at once. One styleEffect call per group connects the same motion value to many elements and to several styles, so nothing is updated by hand.',
  section: 'Effects',
  tags: ['styleEffect', 'motionValue', 'selector', 'opacity', 'scale', 'scaleX'],
  docs: ['pages/motion-dev/docs/style-effect.md', 'pages/motion-dev/docs/motion-value.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
