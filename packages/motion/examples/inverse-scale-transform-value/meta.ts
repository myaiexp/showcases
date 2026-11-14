// motion example: Map pins that stay the same size when you zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map pins that stay the same size when you zoom',
  summary: 'A map you can zoom, with pins and labels that keep their size instead of swelling with the map. The map takes the scale; each pin takes 1 divided by that scale, computed by transformValue, so the two cancel out.',
  section: 'Motion values',
  tags: ['transformValue', 'styleEffect', 'scale', 'motionValue', 'animate'],
  docs: ['pages/motion-dev/docs/transform-value.md', 'pages/motion-dev/docs/style-effect.md', 'pages/motion-dev/docs/motion-value.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
