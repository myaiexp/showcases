// motion example: Gears turning about their own centres
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gears turning about their own centres',
  summary: 'Two meshed gears that spin around their own middle, the second one counter-turning. svgEffect applies transform-box: fill-box automatically, so rotate works like it does in CSS; switch to view-box and they swing around the middle of the drawing instead.',
  section: 'Effects',
  tags: ['svgEffect', 'rotate', 'transformBox', 'fill-box', 'transformValue', 'animate'],
  docs: ['pages/motion-dev/docs/svg-effect.md', 'pages/motion-dev/docs/transform-value.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
