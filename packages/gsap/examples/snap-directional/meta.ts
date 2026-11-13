// gsap example: Directional snapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Directional snapping',
  summary:
    'ScrollTrigger.snapDirectional() returns a snap function that takes a direction, and here it drives snapTo so that scrolling a little forward lands on the next stop, not the nearest. A readout shows snap(v), snap(v, 1) and snap(v, -1) for an increment and for an array, beside a plain nearest-value snap.',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'snapDirectional', 'snap', 'snapTo', 'direction'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-snapDirectional-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/direction.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
