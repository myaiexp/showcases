// motion example: Delivery van with independent transforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Delivery van: move, grow, tilt and skew independently',
  summary: 'A delivery van drives, bobs, grows, tilts and leans, each as its own animation. Switch any one on or off and the others keep going, because x, y, scale, rotate and skew are separate values rather than one transform string.',
  section: 'animate',
  tags: ['animate', 'x', 'y', 'scale', 'rotate', 'skewX', 'independent transforms'],
  docs: ['pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/improvements-to-the-web-animations-api-dx.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
