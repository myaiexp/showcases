// gsap example: Config and defaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Config limitCallbacks and defaults',
  summary:
    'A column of ten boxes with ScrollTriggers is rebuilt in a box that starts scrolled part-way down, and the readout counts how many onEnter callbacks fire. Turn on config({ limitCallbacks }) to skip the ones for boxes already passed, and defaults({ toggleActions }) to give every trigger a reverse without repeating it.',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'config', 'limitCallbacks', 'defaults', 'toggleActions', 'onEnter'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-config-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/static-defaults-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
