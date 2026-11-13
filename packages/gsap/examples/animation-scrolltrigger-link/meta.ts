// gsap example: ScrollTrigger and its animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollTrigger and its animation',
  summary:
    'Three lanes link a ScrollTrigger to an animation three ways: inside a tween, inside a timeline, and standalone with animation: tween. A readout shows tween.scrollTrigger and timeline.scrollTrigger, st.animation and the trigger element, and buttons try refresh(), getTween(), kill(), kill(false) and kill(false, true).',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'animation', 'trigger', 'getTween', 'kill', 'refresh', 'scrubbing', 'Tween.scrollTrigger', 'Timeline.scrollTrigger'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/scrollTrigger.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/scrollTrigger.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/animation.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/trigger.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/vars.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/getTween-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/kill-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/refresh-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-create-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
