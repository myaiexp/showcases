// gsap example: Tick while hidden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tick while hidden',
  summary:
    'A spinner with live gsap.ticker counters. Switch to another tab with tickGSAPWhileHidden() on and GSAP keeps ticking at about 2 ticks a second, which the counters prove when you come back.',
  section: 'Helper functions',
  tags: ['tickGSAPWhileHidden', 'ticker', 'lagSmoothing', 'visibilitychange'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/tickGSAPWhileHidden.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
