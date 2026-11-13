// gsap example: Weighted eases
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Weighted eases',
  summary:
    'Five dots trace the same ease weighted from -1 to 1, like "power2.inOut(0.5)". The addWeightedEases() helper gives every standard ease a ratio that pulls the curve toward its start or end.',
  section: 'Helper functions',
  tags: ['addWeightedEases', 'parseEase', 'ease config', 'power2.inOut'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/addWeightedEases.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
