// GSAP example: every core ease family drawn as a curve with .in, .out and .inOut
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ease curve gallery',
  summary:
    'Twelve small graphs plot the core eases (none, power1-4, back, elastic, bounce, circ, expo, sine, steps) by sampling gsap.parseEase(). A dot rides each curve; switch between .out, .in and .inOut.',
  section: 'Eases',
  tags: ['ease', 'parseEase', 'power1', 'back', 'elastic', 'bounce', 'steps', 'inOut'],
  docs: [
    'pages/gsap-com/docs/v3/Eases.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-parseEase-.md',
    'pages/gsap-com/docs/v3/Eases/SteppedEase.md',
    'pages/gsap-com/resources/getting-started/Easing.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
