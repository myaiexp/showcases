// gsap example: MotionPathPlugin through an array of points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion path through points',
  summary: 'A dot follows a curve plotted through five points. The curviness slider pulls the curve from straight lines to loops, redrawn with arrayToRawPath and rawPathToString.',
  section: 'MotionPath',
  tags: ['motionPath', 'curviness', 'arrayToRawPath', 'rawPathToString', 'fromCurrent'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-arrayToRawPath-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-rawPathToString-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
