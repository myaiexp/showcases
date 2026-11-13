// gsap example: registerEffect defines named effects used through gsap.effects and on timelines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reusable effects',
  summary:
    'popIn and shake are registered once with gsap.registerEffect() (with config defaults and extendTimeline), then triggered through gsap.effects or chained straight onto a timeline.',
  section: 'gsap methods',
  tags: ['registerEffect', 'effects', 'extendTimeline', 'defaults', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/gsap-registerEffect-.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-effects.md',
    'pages/gsap-com/docs/v3/GSAP/CorePlugins/CSS.md',
    'pages/gsap-com/resources/position-parameter.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
