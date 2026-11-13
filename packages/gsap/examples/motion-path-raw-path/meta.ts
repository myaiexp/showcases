// gsap example: MotionPathPlugin RawPath statics: stringToRawPath, sliceRawPath, getLength, getPositionOnPath, pointsToSegment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MotionPath raw path utilities',
  summary:
    'One path parsed into a RawPath, then sliced between two positions, measured, and probed for a point and tangent angle. A second curve is plotted through points with pointsToSegment, and a circle is turned into a path.',
  section: 'MotionPath',
  tags: ['MotionPathPlugin', 'RawPath', 'stringToRawPath', 'sliceRawPath', 'getLength', 'getPositionOnPath', 'pointsToSegment', 'convertToPath'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-stringToRawPath-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-getRawPath-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-sliceRawPath-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-getLength-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-getPositionOnPath-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/methods/static-pointsToSegment.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-convertToPath-.md',
    'pages/gsap-com/docs/v3/Plugins/MotionPathPlugin/static-rawPathToString-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
