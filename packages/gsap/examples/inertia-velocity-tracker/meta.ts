// gsap example: InertiaPlugin.track, getVelocity, isTracking, untrack and the VelocityTracker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'InertiaPlugin velocity tracker',
  summary:
    'A ball whose x and y are tracked with InertiaPlugin.track(): an arrow shows its live velocity, and on release it is thrown with velocity "auto". Checkboxes untrack an axis to show what happens without velocity data.',
  section: 'Inertia',
  tags: ['InertiaPlugin', 'track', 'getVelocity', 'isTracking', 'untrack', 'VelocityTracker', 'auto'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/InertiaPlugin/static-track-.md',
    'pages/gsap-com/docs/v3/Plugins/InertiaPlugin/static-getVelocity-.md',
    'pages/gsap-com/docs/v3/Plugins/InertiaPlugin/static-isTracking-.md',
    'pages/gsap-com/docs/v3/Plugins/InertiaPlugin/static-untrack-.md',
    'pages/gsap-com/docs/v3/Plugins/InertiaPlugin/VelocityTracker.md',
    'pages/gsap-com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/-get-.md',
    'pages/gsap-com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/-getByTarget-.md',
    'pages/gsap-com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/-isTracking-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
