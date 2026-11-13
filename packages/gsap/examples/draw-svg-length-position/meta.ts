// gsap example: DrawSVGPlugin.getLength and getPosition read on a sliding stroke window
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DrawSVG length and position',
  summary:
    'A circle, rect, line, polygon and path each draw a sliding window of their stroke. DrawSVGPlugin.getLength() and getPosition() are read every frame to show the stroke length, the window start and end, and the percentage drawn.',
  section: 'DrawSVG',
  tags: ['DrawSVGPlugin', 'drawSVG', 'getLength', 'getPosition', 'stroke'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/DrawSVGPlugin/static-getLength-.md',
    'pages/gsap-com/docs/v3/Plugins/DrawSVGPlugin/static-getPosition-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
