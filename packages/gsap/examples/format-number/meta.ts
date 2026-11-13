// gsap example: Number formatter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Number formatter',
  summary:
    'A plain number is tweened and rewritten every frame as 1,000.25 style text. Compares formatNumber(n, 2) with the getFormatter(increment, pad) variant that snaps and pads decimals.',
  section: 'Helper functions',
  tags: ['formatNumber', 'getFormatter', 'onUpdate', 'utils.snap', 'toLocaleString'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/formatNumber.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
