// gsap example: InertiaPlugin throw with snapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Throw with inertia and snap',
  summary:
    'Flick a box and it glides to a stop with momentum, then settles on the nearest grid cell. A checkbox turns the snap function on and off.',
  section: 'Inertia',
  tags: ['InertiaPlugin', 'Draggable', 'inertia', 'snap', 'end', 'onThrowComplete'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/InertiaPlugin.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
