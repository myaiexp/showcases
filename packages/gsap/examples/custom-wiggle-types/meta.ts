// gsap example: CustomWiggle types and amplitudeEase/timingEase
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CustomWiggle types',
  summary:
    'Six bars swing with CustomWiggle eases: easeOut, easeInOut, anticipate, uniform, random, and one built from an amplitudeEase and a timingEase. Each ease is plotted above its bar; sliders change the wiggle count and the strength.',
  section: 'Custom eases',
  tags: ['CustomWiggle', 'ease', 'wiggles', 'amplitudeEase', 'timingEase'],
  docs: ['pages/gsap-com/docs/v3/Eases/CustomWiggle.md', 'pages/gsap-com/docs/v3/Eases/CustomEase.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
