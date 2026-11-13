// gsap example: MotionPathPlugin getRelativePosition, convertCoordinates, getGlobalMatrix and getAlignMatrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MotionPath coordinate helpers',
  summary:
    'A dot inside a rotated, scaled box is sent to a target in a different rotated, scaled box. getRelativePosition, getAlignMatrix and convertCoordinates compute where to move it; getGlobalMatrix draws a ring on its real screen position.',
  section: 'MotionPath',
  tags: ['MotionPathPlugin', 'getRelativePosition', 'convertCoordinates', 'getGlobalMatrix', 'getAlignMatrix', 'Matrix2D'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-getRelativePosition-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-convertCoordinates-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-getGlobalMatrix-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-getAlignMatrix-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
