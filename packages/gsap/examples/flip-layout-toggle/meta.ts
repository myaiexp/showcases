// gsap example: Flip layout toggle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flip layout toggle',
  summary:
    'Eight tiles switch between a grid and a list with one class toggle. Flip.getState() records the old layout and Flip.from() animates every tile from there to its new place.',
  section: 'Flip',
  tags: ['Flip', 'getState', 'from', 'absolute', 'stagger'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/Flip.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-getState-.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-from-.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-killFlipsOf-.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
