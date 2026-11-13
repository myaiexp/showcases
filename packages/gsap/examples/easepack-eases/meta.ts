// GSAP example: rough, slow, steps and expoScale eases side by side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EasePack eases in motion',
  summary:
    'Four lanes loop the same 2.4 second tween with different string eases: a jagged rough(), a slow(0.5, 0.8) glide, steps(6), and expoScale on a growing circle.',
  section: 'Eases',
  tags: ['ease', 'rough', 'slow', 'steps', 'expoScale', 'EasePack'],
  docs: [
    'pages/gsap-com/docs/v3/Eases/RoughEase.md',
    'pages/gsap-com/docs/v3/Eases/SlowMo.md',
    'pages/gsap-com/docs/v3/Eases/SteppedEase.md',
    'pages/gsap-com/docs/v3/Eases/ExpoScaleEase.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
