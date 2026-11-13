// gsap example: ScrollTrigger mistake, values that never update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollTrigger mistake: values that never refresh',
  summary:
    'A hard-coded end value and a hard-coded x are computed once, while a function-based end, a function-based x and invalidateOnRefresh follow the box when it grows. Resize the boxes and call ScrollTrigger.refresh() to compare the scroll distance and ball position of both.',
  section: 'Resources',
  tags: ['ScrollTrigger', 'mistakes', 'function-based values', 'invalidateOnRefresh', 'refresh', 'end'],
  docs: [
    'pages/gsap-com/resources/st-mistakes.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-refresh-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/end.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
