// gsap example: Kill child tweens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Kill child tweens',
  summary:
    'Three boxes tween to the right; two of them sit inside a dashed group. killChildTweensOf(group) walks the global timeline and stops only the tweens aimed at elements inside that group.',
  section: 'Helper functions',
  tags: ['killChildTweensOf', 'globalTimeline', 'getChildren', 'targets()', 'kill'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/killChildTweensOf.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
