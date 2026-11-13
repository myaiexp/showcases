// GSAP example: clamp, mapRange, normalize, snap and pipe turning one slider value into several outputs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One slider, many ranges',
  summary:
    'A single value from -20 to 120 is clamped, mapped to pixels and snapped through pipe(), normalized into a fill bar, and mapped to a dial angle. Each row labels the utility that made it.',
  section: 'Utility methods',
  tags: ['utils', 'clamp', 'mapRange', 'normalize', 'snap', 'pipe'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/gsap-quickSetter-.md',
    'pages/gsap-com/docs/v3/GSAP/UtilityMethods/clamp-.md',
    'pages/gsap-com/docs/v3/GSAP/UtilityMethods/mapRange-.md',
    'pages/gsap-com/docs/v3/GSAP/UtilityMethods/normalize-.md',
    'pages/gsap-com/docs/v3/GSAP/UtilityMethods/pipe-.md',
    'pages/gsap-com/docs/v3/GSAP/UtilityMethods/snap-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
