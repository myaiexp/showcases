// gsap example: Compensated skew
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compensated skew',
  summary:
    'Two letter boxes swing between -55 and 55 degrees of skewX. The right one adds the compensatedSkew() helper in onUpdate, which trims scale as it skews like the old GSAP 2 compensated mode.',
  section: 'Helper functions',
  tags: ['compensatedSkew', 'skewX', 'onUpdate', 'targets()', 'scaleY'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/compensatedSkew.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
