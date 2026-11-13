// gsap example: MotionPathHelper.editPath with onRelease re-running a motionPath tween
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MotionPathHelper path editor',
  summary:
    'MotionPathHelper.editPath() makes an SVG curve editable: drag its anchors and handles, add or delete points. A marker keeps following whatever the curve becomes; the card only plays the marker along the default path.',
  section: 'MotionPath',
  tags: ['MotionPathHelper', 'editPath', 'path', 'editor', 'kill'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/MotionPathHelper.md',
    'pages/gsap-com/docs/v3/MotionPathHelper/static-editPath-.md',
    'pages/gsap-com/docs/v3/MotionPathHelper/kill-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
